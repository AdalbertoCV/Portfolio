import { Link } from 'react-router-dom';
import { monogram } from './techStack';
import { PROJECT_TECH } from '../projects/catalogue';
import ConceptIcon from './ConceptIcons';

/**
 * One technology: its mark, its name, and — where the catalogue can prove it —
 * how many projects stand behind it, linking to exactly those.
 *
 * No card around it. Cards were what made 315 of these into a wall; with one
 * group on screen the grid itself is the container, and the marks can have the
 * room they were never given.
 */
const TechMark = ({ item, t }) => {
  const built = PROJECT_TECH[item.name];
  // One tile needs its label translated rather than taken from its own name:
  // the parenthesis is the joke, and the joke is in Spanish.
  const label = item.labelKey ? t(item.labelKey) : item.name;

  const face = (
    <>
      <span className="stack-mark-art">
        {item.icon ? (
          <img
            className="tech-icon"
            src={item.icon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            data-mono={item.mono ? 'true' : undefined}
            data-flat={item.flat ? 'true' : undefined}
          />
        ) : item.concept ? (
          <ConceptIcon className="tech-concept" name={item.concept} />
        ) : (
          // Last resort only — every current entry has either a logo or a
          // concept icon, so this should never render.
          <span className="tech-monogram" aria-hidden="true">
            {monogram(item.name)}
          </span>
        )}
        {built ? (
          <span className="tech-receipt" aria-hidden="true">
            {built}
          </span>
        ) : null}
      </span>
      <span className="tech-name">{label}</span>
    </>
  );

  return (
    <li className={`stack-mark${built ? ' is-linked' : ''}`}>
      {built ? (
        <Link
          className="stack-mark-link"
          to={`/projects?tech=${encodeURIComponent(item.name)}`}
          aria-label={`${item.name} — ${built} ${t('cv.skillsReceipt')}`}
        >
          {face}
        </Link>
      ) : (
        face
      )}
    </li>
  );
};

export default TechMark;
