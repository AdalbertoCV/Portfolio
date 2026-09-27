import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowUpRight, Reveal, Section } from '../brand/parts';
import ReadingExplorer from './ReadingExplorer';
import { INTEREST_KEYS, INTEREST_LINKS, INTEREST_TONES } from '../about/interestsData';
import InterestArt from '../about/InterestArt';

// The second half of the Stack & Library page: where the way I think comes
// from, and what to read about it. `id="library"` is where the old /library
// address and the terminal's `library` command land.
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

const LibrarySections = () => {
  const { t, tl } = useTranslation();
  const [liveRef, live] = useLive();

  return (
    <div id="library">
      {/* ----------------------------------------------------------- interests */}
      <Section
        kicker={t('cv.interestsKicker')}
        title={t('cv.interestsTitle')}
        lede={t('cv.interestsLede')}
      >
        {/* The live flag sits on a wrapper, not on the Reveal: Reveal adds its
            own class by hand, and a re-render of its className would drop it. */}
        <div ref={liveRef} className={`cv-interests-live${live ? ' is-live' : ''}`}>
          <Reveal className="cv-interests" stagger>
            {INTEREST_KEYS.map((key) => (
              <article className="cv-interest" key={key} style={{ '--tone': INTEREST_TONES[key] }}>
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
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------- reading */}
      <Section
        kicker={t('cv.readingKicker')}
        title={t('cv.readingTitle')}
        lede={t('cv.readingLede')}
      >
        <Reveal>
          <ReadingExplorer />
        </Reveal>
        {/* The shelves are the reading that has a use; the rest is taste, and
            taste is not something to recommend. */}
        <p className="reading-aside">{t('cv.readingAside')}</p>
      </Section>
    </div>
  );
};

export default LibrarySections;
