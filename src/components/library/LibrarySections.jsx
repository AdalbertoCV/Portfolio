import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal, Section } from '../brand/parts';
import ReadingExplorer from './ReadingExplorer';
import InterestsRail from './InterestsRail';

// The second half of the Stack & Library page: where the way I think comes
// from, and what to read about it. `id="library"` is where the old /library
// address and the terminal's `library` command land.

const LibrarySections = () => {
  const { t } = useTranslation();

  return (
    <div id="library">
      {/* ----------------------------------------------------------- interests */}
      <Section
        kicker={t('cv.interestsKicker')}
        title={t('cv.interestsTitle')}
        lede={t('cv.interestsLede')}
      >
        <InterestsRail />
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
