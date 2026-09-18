import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { useTheme } from '../../theme/ThemeProvider';
import { COMMANDS, parse, suggest } from './commands';
import './terminal.css';

/* ==========================================================================
   THE TERMINAL

   A command palette that is also a shell, because for this audience those are
   the same gesture. It opens on ⌘K, it navigates the site, and it answers a
   few questions in the voice the rest of the site would not get away with.

   It is a real way around, not decoration: every route here is reachable by
   typing, which on a site with fourteen of them is faster than the navbar.
   ======================================================================== */

const PROMPT = '$';

const Terminal = () => {
  const { t, lang, setLang } = useTranslation();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(0);
  // Shell history, walked with the arrow keys once the input is empty.
  const history = useRef([]);
  const historyAt = useRef(-1);

  const inputRef = useRef(null);
  const logRef = useRef(null);
  const openerRef = useRef(null);

  const matches = suggest(input);
  const active = matches[Math.min(cursor, Math.max(matches.length - 1, 0))];

  /* ------------------------------------------------------------ opening */

  useEffect(() => {
    const onKey = (event) => {
      const k = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && k === 'k') {
        event.preventDefault();
        // Remember who had focus so Escape can hand it back.
        openerRef.current = document.activeElement;
        setOpen((was) => !was);
        return;
      }
      if (k === 'escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Anything else on the page that wants to open it says so on the window
  // rather than reaching in — the footer button and the console easter egg
  // both use this.
  useEffect(() => {
    const onOpen = () => {
      openerRef.current = document.activeElement;
      setOpen(true);
    };
    window.addEventListener('portfolio:terminal', onOpen);
    return () => window.removeEventListener('portfolio:terminal', onOpen);
  }, []);

  useEffect(() => {
    if (!open) {
      // Give focus back to whatever opened it, so a keyboard visitor is not
      // dropped at the top of the document.
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
      return undefined;
    }
    inputRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // The transcript scrolls itself, the way a shell does.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines, open]);

  useEffect(() => setCursor(0), [input]);

  /* ------------------------------------------------------------- running */

  const run = useCallback(
    (raw) => {
      const typed = raw.trim();
      if (!typed) return;

      history.current = [typed, ...history.current.filter((h) => h !== typed)].slice(0, 30);
      historyAt.current = -1;

      const { command, arg, head } = parse(typed);
      const echo = { kind: 'echo', text: typed };

      if (!command) {
        setLines((prev) => [
          ...prev,
          echo,
          { kind: 'dim', text: t('term.unknown').replace('{cmd}', head) },
        ]);
        setInput('');
        return;
      }

      const printed = command.run(
        {
          t,
          lang,
          setLang,
          toggleTheme,
          go: (path) => {
            navigate(path);
            // Leave the shell open just long enough to read the reply.
            window.setTimeout(() => setOpen(false), 420);
          },
          clear: () => setLines([]),
          close: () => setOpen(false),
        },
        arg
      );

      setLines((prev) =>
        command.id === 'clear' ? [] : [...prev, echo, ...(printed || [])]
      );
      setInput('');
    },
    [t, lang, setLang, toggleTheme, navigate]
  );

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Enter on a highlighted suggestion completes it rather than running a
      // half-typed word — except when the line already says what it means.
      const { command } = parse(input);
      if (!command && active) {
        setInput(active.arg ? `${active.id} ${active.arg}` : active.id);
        return;
      }
      run(input);
      return;
    }
    if (event.key === 'Tab' && active) {
      event.preventDefault();
      setInput(active.arg ? `${active.id} ${active.arg}` : active.id);
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((c) => Math.min(c + 1, matches.length - 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      // Empty line: walk the history. Otherwise: move up the suggestions.
      if (!input && history.current.length) {
        historyAt.current = Math.min(historyAt.current + 1, history.current.length - 1);
        setInput(history.current[historyAt.current]);
        return;
      }
      setCursor((c) => Math.max(c - 1, 0));
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="term"
      role="dialog"
      aria-modal="true"
      aria-label={t('term.label')}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div className="term-window">
        <div className="term-bar">
          <span className="term-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="term-title">{t('term.title')}</span>
          <kbd className="term-esc">esc</kbd>
        </div>

        {/* The transcript. aria-live so a screen reader hears each reply
            instead of only seeing it. */}
        <div className="term-log" ref={logRef} aria-live="polite">
          {lines.length === 0 ? (
            <p className="term-line term-dim">{t('term.greeting')}</p>
          ) : null}
          {lines.map((line, i) =>
            line.kind === 'echo' ? (
              <p className="term-line term-echo" key={i}>
                <span aria-hidden="true">{PROMPT}</span> {line.text}
              </p>
            ) : line.kind === 'link' ? (
              <p className="term-line" key={i}>
                <a
                  href={line.href}
                  className="term-link"
                  {...(line.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {line.text}
                </a>
              </p>
            ) : (
              <p className={`term-line${line.kind === 'dim' ? ' term-dim' : ''}`} key={i}>
                {line.text}
              </p>
            )
          )}
        </div>

        <div className="term-input">
          <span className="term-prompt" aria-hidden="true">
            {PROMPT}
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t('term.placeholder')}
            aria-label={t('term.inputLabel')}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        {matches.length ? (
          <ul className="term-suggest">
            {matches.slice(0, 6).map((command, i) => (
              <li key={command.id}>
                <button
                  type="button"
                  className={`term-suggest-item${command === active ? ' is-active' : ''}`}
                  // Mouse down rather than click: the input must not lose focus
                  // between pressing and running.
                  onMouseDown={(event) => {
                    event.preventDefault();
                    run(command.arg ? `${command.id} ${command.arg}` : command.id);
                  }}
                  onMouseEnter={() => setCursor(i)}
                >
                  <span className="term-suggest-name">
                    {command.id}
                    {command.arg ? <em> {command.arg}</em> : null}
                  </span>
                  <span className="term-suggest-desc">{t(`term.desc.${command.id}`)}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>,
    document.body
  );
};

export const openTerminal = () => window.dispatchEvent(new Event('portfolio:terminal'));

export const COMMAND_COUNT = COMMANDS.length;

export default Terminal;
