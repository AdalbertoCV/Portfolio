import { useTranslation } from '../../i18n/I18nProvider';

/**
 * The first tab stop on every page. Hidden until focused, which is the whole
 * point: a keyboard user on the home page would otherwise tab through the
 * navbar, both toggles and four social links before reaching any content.
 */
const SkipLink = () => {
  const { t } = useTranslation();
  return (
    <a className="skip-link" href="#main">
      {t('common.skipToContent')}
    </a>
  );
};

export default SkipLink;
