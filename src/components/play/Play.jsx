import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, Reveal } from '../brand/parts';
import { createGame, WORLD } from './engine';
import './play.css';

const BEST_KEY = 'portfolio-play-best';

const readBest = () => {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch (error) {
    return 0;
  }
};

/**
 * A laptop that jumps bugs.
 *
 * It lives on its own route and the 404 borrows it, which is the arrangement
 * that costs the serious pages nothing: a mistyped URL used to render blank,
 * and now it renders the one thing on the site that is purely for fun.
 *
 * The engine is a plain module — no React inside the loop, because sixty
 * setStates a second is how you make a canvas game stutter. It publishes the
 * score through a callback and the component throttles that into state.
 */
const Play = ({ notFound = false }) => {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [best, setBest] = useState(readBest);
  const [state, setState] = useState({ score: 0, best: readBest(), status: 'ready', dodged: 0 });

  // The published score arrives every frame; the DOM only needs it when the
  // number it would print actually changes.
  const onState = useCallback((next) => {
    setState((current) =>
      current.score === next.score && current.status === next.status && current.best === next.best
        ? current
        : next
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    // The canvas is sized in device pixels and drawn in world units, so the
    // sprites stay crisp on a retina screen instead of being upscaled mush.
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round((width * (WORLD.h / WORLD.w)) * ratio);
    };
    resize();

    const game = createGame(canvas, onState, readBest());
    gameRef.current = game;

    window.addEventListener('resize', resize);
    const onBlur = () => game.pause();
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('blur', onBlur);
      game.stop();
      gameRef.current = null;
    };
  }, [onState]);

  // Space and the arrow scroll the page by default, which in a jumping game is
  // the single most annoying thing a browser does.
  useEffect(() => {
    const onKey = (event) => {
      if (event.code !== 'Space' && event.code !== 'ArrowUp' && event.code !== 'KeyW') return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      event.preventDefault();
      gameRef.current?.jump();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (state.best <= best) return;
    setBest(state.best);
    try {
      window.localStorage.setItem(BEST_KEY, String(state.best));
    } catch (error) {
      // A best score that does not survive a reload is still a best score.
    }
  }, [state.best, best]);

  const jump = () => gameRef.current?.jump();

  return (
    <div className="play-page">
      <Reveal className="play-head">
        <span className="hub-badge">{t(notFound ? 'play.lostBadge' : 'play.badge')}</span>
        <h1 className="play-title">{t(notFound ? 'play.lostTitle' : 'play.title')}</h1>
        <p className="play-lede">{t(notFound ? 'play.lostLede' : 'play.lede')}</p>
      </Reveal>

      <Reveal className="play-frame">
        <div className="play-scores">
          <span className="play-score">
            <span className="play-score-label">{t('play.score')}</span>
            <strong>{String(state.score).padStart(5, '0')}</strong>
          </span>
          <span className="play-score">
            <span className="play-score-label">{t('play.dodged')}</span>
            <strong>{state.dodged}</strong>
          </span>
          <span className="play-score">
            <span className="play-score-label">{t('play.best')}</span>
            <strong>{String(Math.max(best, state.best)).padStart(5, '0')}</strong>
          </span>
        </div>

        {/* The canvas is the control: tapping it is how a phone jumps, and the
            button under it is how a screen reader and a keyboard do. */}
        <canvas
          ref={canvasRef}
          className="play-canvas"
          onPointerDown={(event) => {
            event.preventDefault();
            jump();
          }}
          role="img"
          aria-label={t('play.canvasLabel')}
        />

        {state.status !== 'running' ? (
          <div className="play-overlay">
            <p>{state.status === 'over' ? t('play.over') : t('play.ready')}</p>
            <button type="button" className="brand-link-out play-start" onClick={jump}>
              {state.status === 'over' ? t('play.again') : t('play.start')}
              <ArrowRight />
            </button>
            <p className="play-hint">{t('play.hint')}</p>
          </div>
        ) : null}
      </Reveal>

      <Reveal className="play-foot">
        <p className="play-note">{t('play.note')}</p>
        <Link className="play-back" to="/">
          {t('play.back')}
          <ArrowRight />
        </Link>
      </Reveal>
    </div>
  );
};

export default Play;
