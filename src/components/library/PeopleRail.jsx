import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowUpRight } from '../brand/parts';
import REFERENCES from '../about/references';
import RefHacker from '../about/RefHacker';
import PeopleNet from './PeopleNet';
import SpotlightRail from './SpotlightRail';

// The people, one at a time, with the network they belong to beside them. The
// cards say who and where; the network says how they connect to the work, and it
// grows with the list. Nobody here is quoted: none of them was asked for a
// sentence, so a card hands over their links instead of putting words in their
// mouths. The drawing is on the left, so down the page the sections alternate:
// credentials on the left, events on the right, people on the left again. See
// SpotlightRail for the rail and PeopleNet for the drawing.

const OTHER = 'other';

const PeopleRail = () => {
  const { t } = useTranslation();

  const items = REFERENCES.map((person) => {
    const orgs = [...new Set(person.roles.map((role) => role.org).filter(Boolean))];
    return {
      key: person.id,
      tone: person.glow,
      label: person.name,
      orgs,
      group: orgs[0] || OTHER,
      person,
    };
  });

  // One chip per organisation once there are enough people to need them; the
  // ones with no organisation on the page go together.
  const groupIds = [...new Set(items.map((item) => item.group))];
  const groups = groupIds.map((id) => ({ id, label: id === OTHER ? t('cv.peopleOther') : id }));

  return (
    <SpotlightRail
      items={items}
      groups={groups}
      allLabel={t('cv.peopleAll')}
      idPrefix="person"
      className="cv-spot cv-spot--people"
      prevLabel={t('cv.peoplePrev')}
      nextLabel={t('cv.peopleNext')}
      renderPanel={({ index, live, item, count, items: shown }) => {
        const orgs = new Set(shown.flatMap((entry) => entry.orgs)).size;
        return (
          <PeopleNet
            items={shown}
            index={index}
            live={live}
            subject={item ? item.label : ''}
            meta={
              <>
                <b>{count}</b> {count === 1 ? t('cv.netPerson') : t('cv.netPeople')} · <b>{orgs}</b>{' '}
                {orgs === 1 ? t('cv.netOrg') : t('cv.netOrgs')}
              </>
            }
          />
        );
      }}
      renderCard={({ person, orgs }) => {
        const { name, figure, glow, roles, site, linkedin } = person;
        return (
          <>
            <div className="ref-plate">
              <RefHacker name={name} figure={figure} glow={glow} />
              <p className="ref-plate-meta">
                <b>{orgs.length ? orgs.join(' · ') : t('cv.peopleOther')}</b>
                <span>{t('cv.peopleTag')}</span>
              </p>
            </div>
            <h3>{name}</h3>
            <div className="ref-roles">
              {roles.map(({ id: roleId, org }) => (
                <p className="ref-role" key={roleId}>
                  {t(`cv.references.${roleId}`)}
                  {/* A role can stand without a company, when the company is
                      not known. */}
                  {org ? <span className="ref-org">{org}</span> : null}
                </p>
              ))}
            </div>
            <div className="people-links">
              <a className="cv-interest-link" href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
                <ArrowUpRight />
              </a>
              {/* The portfolio link is optional: an absent one is better than a
                  dead one. */}
              {site ? (
                <a className="cv-interest-link" href={site} target="_blank" rel="noopener noreferrer">
                  {t('cv.referencesSite')}
                  <ArrowUpRight />
                </a>
              ) : null}
            </div>
          </>
        );
      }}
    />
  );
};

export default PeopleRail;
