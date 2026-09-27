import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal, Section } from '../brand/parts';
import ReadingExplorer from './ReadingExplorer';
import InterestsRail from './InterestsRail';

// The second half of the Stack & Library page: what to read about, and where the
// way I think comes from. `id="library"` is where the old /library address and
// the terminal's `library` command land.
//
// Reading comes first because it is the part with a job: shelves a reader can
// open and finish, sorted by what they are for. The subjects are the other half
// of the argument and they are a rail, so they go last, where a reader who wants
// the list has already been given the list and a reader in a hurry has passed
// it.

const LibrarySections = () => {
  const { t } = useTranslation();

  return (
    <div id="library">
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

      {/* ----------------------------------------------------------- interests */}
      <Section
        kicker={t('cv.interestsKicker')}
        title={t('cv.interestsTitle')}
        lede={t('cv.interestsLede')}
      >
        <InterestsRail />
      </Section>
    </div>
  );
};

export default LibrarySections;
