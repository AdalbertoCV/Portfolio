import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowUpRight } from '../brand/parts';
import { INTEREST_KEYS, INTEREST_LINKS, INTEREST_TONES } from '../about/interestsData';
import InterestArt from '../about/InterestArt';
import NeuralMind from './NeuralMind';
import SpotlightRail from './SpotlightRail';

// The eight cards that say where the thinking comes from used to open all at
// once: four rows of tall cards, each with a paragraph, most with two, and a row
// of tags under it. It is the longest stretch on the page, the reader has to
// pass all of it to reach the shelves, and by the time they get there the cards
// have blurred into one block — eight subjects, each of which changed a
// decision, presented as a wall.
//
// So they are a rail: one card, the edge of the next, a dot per subject in the
// tone of its own card, and arrows for the people who would rather not swipe.
// The rail itself is SpotlightRail now, shared with the sections that copied
// the idea; what is left here is what only the interests have: the cards and
// the brain that fires from the region of the one in view.

const InterestsRail = () => {
  const { t, tl } = useTranslation();

  const items = INTEREST_KEYS.map((key) => ({
    key,
    tone: INTEREST_TONES[key],
    label: t(`cv.interests.${key}.title`),
  }));

  return (
    <SpotlightRail
      items={items}
      idPrefix="interest"
      prevLabel={t('cv.interestsPrev')}
      nextLabel={t('cv.interestsNext')}
      // The brain beside the rail, wired to it: the subject in view is the
      // region that fires. Beside the card on a desktop, over it on a phone.
      renderPanel={({ index, live }) => <NeuralMind index={index} live={live} />}
      renderCard={({ key }) => (
        <>
          <InterestArt name={key} />
          <h3>{t(`cv.interests.${key}.title`)}</h3>
          <p>{t(`cv.interests.${key}.body`)}</p>
          {/* Optional second paragraph: translate() hands back the key itself
              on a miss, so a card without one renders nothing. */}
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
        </>
      )}
    />
  );
};

export default InterestsRail;
