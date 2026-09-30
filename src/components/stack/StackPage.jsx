import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { Reveal, TalkBand } from '../brand/parts';
import StackExplorer from '../about/StackExplorer';
import TECH_GROUPS from '../about/techStack';
import StackConstellation from '../library/StackConstellation';
import { useLive } from '../library/SpotlightRail';
import LibrarySections from '../library/LibrarySections';
import '../about/about.css';

// What I build with and what I read, on one page. Both used to sit on About,
// where they were more than half its length and neither was about the person
// the page is named for; then they were two pages, which split one idea — the
// tools and the thinking behind them — across two clicks.
const StackPage = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  // The area in the panel and the search live here, so the constellation above
  // and the explorer below are two views of the same choice.
  const [group, setGroup] = useState(TECH_GROUPS[0].id);
  const [query, setQuery] = useState('');
  const [skyRef, live] = useLive();

  // /library and the terminal's `library` land on the shelves, not the top.
  useEffect(() => {
    if (hash !== '#library') return undefined;
    const timer = window.setTimeout(() => document.getElementById('library')?.scrollIntoView({ block: 'start' }), 0);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <div className="hub-page">
      <Reveal className="hub-header">
        <span className="hub-badge">{t('cv.skillsKicker')}</span>
        <h1 className="hub-title">{t('cv.skillsTitle')}</h1>
        <p className="hub-lede">{t('cv.skillsLede')}</p>
      </Reveal>

      {/* The whole stack as one constellation, straight under the title where the
          eye lands. A band across the width on a desktop, a short block on a
          phone; it is in the flow of the page and does not follow it. */}
      <Reveal>
        <div ref={skyRef}>
          <StackConstellation
            groups={TECH_GROUPS}
            active={group}
            query={query}
            live={live}
            onSelect={(id) => {
              setQuery('');
              setGroup(id);
            }}
          />
        </div>
      </Reveal>

      <Reveal>
        <StackExplorer group={group} onGroupChange={setGroup} query={query} onQueryChange={setQuery} />
      </Reveal>

      <LibrarySections />

      {/* The end of the tour: the next page in the bar is Contact. */}
      <TalkBand />
    </div>
  );
};

export default StackPage;
