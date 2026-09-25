import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight } from '../brand/parts';
import { CURRENT_STAGE } from './plan';

// The thread from each company's story to the plan. It reads the current
// stage from the plan's data, so advancing the plan moves every chip with it.
const StageChip = () => {
  const { t } = useTranslation();
  return (
    <Link className="stage-chip" to="/ventures/plan">
      <span className="stage-chip-dot" aria-hidden="true" />
      <span className="stage-chip-label">{t('plan.chipLabel')}</span>
      <strong className="stage-chip-stage">{t(`plan.stages.${CURRENT_STAGE}.name`)}</strong>
      <span className="stage-chip-cta">
        {t('plan.chipCta')}
        <ArrowRight />
      </span>
    </Link>
  );
};

export default StageChip;
