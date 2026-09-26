import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowUpRight, Reveal, Section } from '../brand/parts';
import READING from '../about/reading';
import BOOK_COVERS from '../about/bookCovers';
import ConceptIcon from '../about/ConceptIcons';
import { INTEREST_ICONS, INTEREST_KEYS, INTEREST_LINKS } from '../about/interestsData';

// The second half of the Stack & Library page: where the way I think comes
// from, and what to read about it. `id="library"` is where the old /library
// address and the terminal's `library` command land.
const LibrarySections = () => {
  const { t, tl } = useTranslation();

  return (
    <div id="library">
      {/* ----------------------------------------------------------- interests */}
      <Section
        kicker={t('cv.interestsKicker')}
        title={t('cv.interestsTitle')}
        lede={t('cv.interestsLede')}
      >
        <Reveal className="cv-interests" stagger>
          {INTEREST_KEYS.map((key) => (
            <article className="cv-interest" key={key}>
              <div className="cv-interest-icon">{INTEREST_ICONS[key]}</div>
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
      </Section>

      {/* ------------------------------------------------------------- reading */}
      <Section
        kicker={t('cv.readingKicker')}
        title={t('cv.readingTitle')}
        lede={t('cv.readingLede')}
      >
        {READING.map(({ id, books }) => (
          <Reveal className="practice-block" key={id}>
            {/* What the shelf is for and why it is worth the time, so the
                column beside the books says something instead of holding a
                single line over empty space. */}
            <div className="reading-shelf-head">
              <h3 className="practice-title">{t(`cv.readingGroups.${id}`)}</h3>
              <p className="reading-shelf-note">{t(`cv.readingNotes.${id}`)}</p>
            </div>
            <ul className="reading-list">
              {books.map(({ title, author, icon }) => (
                <li key={title}>
                  {/* The cover is how a book is recognised on a shelf; the drawn
                      icon stays only as a fallback for one without a cover. */}
                  {BOOK_COVERS[title] ? (
                    <img className="reading-cover" src={BOOK_COVERS[title]} alt="" loading="lazy" width="40" height="60" />
                  ) : (
                    <ConceptIcon className="list-icon" name={icon} />
                  )}
                  <span className="reading-book">
                    <span className="reading-title">{title}</span>
                    <span className="reading-author">{author}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        {/* The shelves are the reading that has a use; the rest is taste, and
            taste is not something to recommend. */}
        <p className="reading-aside">{t('cv.readingAside')}</p>
      </Section>
    </div>
  );
};

export default LibrarySections;
