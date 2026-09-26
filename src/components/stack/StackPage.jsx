import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, Reveal } from '../brand/parts';
import StackExplorer from '../about/StackExplorer';
import ShelfStrip from '../library/ShelfStrip';
import '../about/about.css';

// The technology wall, on a page of its own. It used to sit halfway down
// About, where it was the longest thing on a page that was supposed to be
// about a person. The explorer is unchanged; only its address moved.
const StackPage = () => {
  const { t } = useTranslation();

  return (
    <div className="hub-page">
      <Reveal className="hub-header">
        <span className="hub-badge">{t('cv.skillsKicker')}</span>
        <h1 className="hub-title">{t('cv.skillsTitle')}</h1>
        <p className="hub-lede">{t('cv.skillsLede')}</p>
      </Reveal>

      <Reveal>
        <StackExplorer />
      </Reveal>

      {/* The hand-off every page makes: to the next one in the bar. */}
      <Reveal className="hub-teaser">
        <div className="hub-teaser-copy">
          <h2 className="brand-h2">{t('stackPage.libraryTitle')}</h2>
          <p className="brand-p">{t('stackPage.libraryLede')}</p>
        </div>
        <ShelfStrip />
        <Link className="brand-link-out hub-teaser-cta" to="/library">
          {t('stackPage.libraryCta')}
          <ArrowRight />
        </Link>
      </Reveal>
    </div>
  );
};

export default StackPage;
