import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowLeft, ArrowRight, ArrowUpRight, Reveal } from '../brand/parts';
import { INTEREST_KEYS, INTEREST_LINKS, INTEREST_TONES } from '../about/interestsData';
import InterestArt from '../about/InterestArt';
import NeuralMind from './NeuralMind';

// The eight cards that say where the thinking comes from used to open all at
// once: four rows of tall cards, each with a paragraph, most with two, and a row
// of tags under it. It is the longest stretch on the page, the reader has to
// pass all of it to reach the shelves, and by the time they get there the cards
// have blurred into one block — eight subjects, each of which changed a
// decision, presented as a wall.
//
// So they are a rail: one card, the edge of the next, a dot per subject in the
// tone of its own card, and arrows for the people who would rather not swipe.
// All eight stay in the document, because this is not a slideshow that throws
// the other seven away; the ones off screen are marked inert, so a keyboard
// cannot land inside a card the reader cannot see.

// True while the element is on screen. The interest scenes loop, and a loop
// nobody can see is work for nothing. Without IntersectionObserver it stays on.
const useLive = () => {
  const ref = useRef(null);
  const [live, setLive] = useState(typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, live];
};

const InterestsRail = () => {
  const { t, tl } = useTranslation();
  const [liveRef, live] = useLive();
  const railRef = useRef(null);
  // Which card is on screen. The first one, so the section is never a rail with
  // nothing in it.
  const [index, setIndex] = useState(0);
  const settle = useRef(null);

  // Move the rail so the chosen card sits at its left edge, which is where the
  // snap puts it after a swipe. Only the rail moves: scrollIntoView would take
  // the page with it, and the reader is halfway down a long section.
  useEffect(() => {
    const rail = railRef.current;
    const card = document.getElementById(`interest-card-${INTEREST_KEYS[index]}`);
    if (!rail || !card) return;
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    if (!max) return;
    // Top as well: a hidden overflow can still be scrolled by the browser (a
    // focus, a find-in-page), and a card left halfway up its rail is a card
    // with a hole under it.
    // Instant, not smooth: the card does not travel, it is replaced where it
    // stands.
    rail.scrollTo({ left: Math.min(card.offsetLeft, max), top: 0, behavior: 'auto' });
  }, [index]);

  // A row of eight cards is as tall as the tallest of the eight, so a subject
  // shorter than the longest one leaves under it a hole the size of the
  // difference — which on a phone, where the cards are taller, is as tall as a
  // card and sits between the subject and the shelves. The rail is given the
  // height of the card being read instead, so the card ends where its content
  // ends and what is under it is the page's own air. Re-measured whenever the
  // card changes and whenever that card changes size, because the same text is
  // a different height on a different width or with a different font loaded.
  useEffect(() => {
    const rail = railRef.current;
    const card = rail && rail.children[index];
    if (!rail || !card) return undefined;

    const fit = () => {
      const { paddingTop, paddingBottom } = getComputedStyle(rail);
      const air = (parseFloat(paddingTop) || 0) + (parseFloat(paddingBottom) || 0);
      rail.style.height = `${card.offsetHeight + air}px`;
    };

    fit();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(fit);
    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  // A swipe that slides the strip while the dots still say "one" is a carousel
  // that lies about where it is. The card the rail comes to rest against is the
  // one that becomes current, once it has stopped moving.
  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const rail = railRef.current;
      if (!rail) return;
      const max = rail.scrollWidth - rail.clientWidth;
      // The last card cannot reach the left edge, so the end of the rail is its
      // resting place and the last card is what the reader is looking at.
      if (max - rail.scrollLeft < 2) {
        setIndex((current) => (current === INTEREST_KEYS.length - 1 ? current : INTEREST_KEYS.length - 1));
        return;
      }
      let closest = 0;
      let distance = Infinity;
      [...rail.querySelectorAll('.cv-interest')].forEach((card, position) => {
        const away = Math.abs(card.offsetLeft - rail.scrollLeft);
        if (away < distance) {
          distance = away;
          closest = position;
        }
      });
      setIndex((current) => (current === closest ? current : closest));
    }, 180);
  };

  useEffect(() => () => clearTimeout(settle.current), []);

  // The arrows stop at the ends: a rail that jumps from the last card back to
  // the first is a cut, not a slide.
  const step = (delta) => {
    const next = index + delta;
    if (next < 0 || next >= INTEREST_KEYS.length) return;
    setIndex(next);
  };

  // Arrow keys on the dots, which is what a row of eight position markers is
  // expected to answer to.
  const walkDots = (event, position) => {
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!delta) return;
    const next = Math.min(Math.max(position + delta, 0), INTEREST_KEYS.length - 1);
    event.preventDefault();
    setIndex(next);
    document.getElementById(`interest-dot-${INTEREST_KEYS[next]}`)?.focus();
  };

  return (
    // The live flag sits on a wrapper, not on the Reveal: Reveal adds its own
    // class by hand, and a re-render of its className would drop it.
    <div ref={liveRef} className={`cv-interests-live${live ? ' is-live' : ''}`}>
      {/* The brain beside the rail, wired to it: the subject in view is the
          region that fires. Beside the card on a desktop, over it on a phone. */}
      <NeuralMind index={index} live={live} />
      <Reveal className="cv-interest-rail">
        <div className="cv-interest-nav">
          {/* One dot per subject, in the tone of the card it opens. Eight dots
              that all look alike would be a page indicator; eight coloured ones
              are the palette of the section. */}
          <div className="cv-interest-dots">
            {INTEREST_KEYS.map((key, position) => (
              <button
                type="button"
                id={`interest-dot-${key}`}
                className="cv-interest-dot"
                key={key}
                style={{ '--tone': INTEREST_TONES[key] }}
                aria-label={t(`cv.interests.${key}.title`)}
                aria-current={index === position ? 'true' : undefined}
                onClick={() => setIndex(position)}
                onKeyDown={(event) => walkDots(event, position)}
              />
            ))}
          </div>
          <div className="cv-interest-steps">
            <button
              type="button"
              className="cv-interest-step"
              onClick={() => step(-1)}
              disabled={index === 0}
              aria-label={t('cv.interestsPrev')}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              className="cv-interest-step"
              onClick={() => step(1)}
              disabled={index === INTEREST_KEYS.length - 1}
              aria-label={t('cv.interestsNext')}
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className="cv-interests" ref={railRef} onScroll={onScroll}>
          {INTEREST_KEYS.map((key, position) => (
            <article
              className="cv-interest"
              id={`interest-card-${key}`}
              key={key}
              style={{ '--tone': INTEREST_TONES[key] }}
              // Off screen means off limits: without this, tabbing forward
              // from the dots lands in a card the rail has scrolled past, and
              // the browser pulls the page sideways to show it.
              inert={index === position ? undefined : ''}
            >
              <InterestArt name={key} />
              <h3>{t(`cv.interests.${key}.title`)}</h3>
              <p>{t(`cv.interests.${key}.body`)}</p>
              {/* Optional second paragraph: translate() hands back the key
                  itself on a miss, so a card without one renders nothing. */}
              {t(`cv.interests.${key}.body2`) !== `cv.interests.${key}.body2` && (
                <p>{t(`cv.interests.${key}.body2`)}</p>
              )}
              {INTEREST_LINKS[key] && (
                <a
                  className="cv-interest-link"
                  href={INTEREST_LINKS[key].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={INTEREST_LINKS[key].mark} alt="" aria-hidden="true" />
                  {t(`cv.interests.${key}.link`)}
                  <ArrowUpRight />
                </a>
              )}
              <div className="brand-chips">
                {tl(`cv.interests.${key}.tags`).map((tag) => (
                  <span className="brand-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

export default InterestsRail;
