import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowRight, ArrowUpRight } from '../brand/parts';
import { EVENT_ITEMS } from '../about/eventsData';
import EventsMap from './EventsMap';
import SpotlightRail from './SpotlightRail';

// The events, one at a time, with the map they happened on beside them. The
// cards say what each room was; the map says where, and in what order, and it
// fills in as the list grows. The drawing is on the right here, so that down the
// page the three sections alternate: credentials on the left, events on the
// right, people on the left. See SpotlightRail for the rail and EventsMap for
// the drawing.

const EventsRail = () => {
  const { t } = useTranslation();

  const items = EVENT_ITEMS.map((event) => ({
    ...event,
    label: t(`cv.events.${event.key}.name`),
    meta: `${t(`cv.events.${event.key}.issuer`)} · ${t(`cv.events.${event.key}.year`)}`,
    group: String(event.year),
  }));
  // Newest year first, the way the cards are.
  const groups = [...new Set(EVENT_ITEMS.map((event) => event.year))]
    .sort((a, b) => b - a)
    .map((year) => ({ id: String(year), label: String(year) }));

  return (
    <SpotlightRail
      items={items}
      groups={groups}
      allLabel={t('cv.eventsAll')}
      idPrefix="event"
      className="cv-spot cv-spot--events cv-spot--flip"
      prevLabel={t('cv.eventsPrev')}
      nextLabel={t('cv.eventsNext')}
      renderPanel={({ index, live, item, count, items: shown }) => {
        const cities = new Set(shown.map((event) => event.city)).size;
        return (
          <EventsMap
            items={shown}
            index={index}
            live={live}
            subject={item ? item.label : ''}
            meta={
              <>
                <b>{count}</b> {t('cv.mapEvents')} · <b>{cities}</b> {cities === 1 ? t('cv.mapCity') : t('cv.mapCities')}
              </>
            }
          />
        );
      }}
      renderCard={(event) => {
        const { key, mark, url, project, paragraphs, label } = event;
        return (
          <>
            {/* The organiser's wordmark is drawn in #e5e5e5, near-white, and
                invisible on a light card. Rather than repaint someone else's
                logo it keeps its real colour and gets the dark ground it was
                drawn for, in both themes. */}
            <div className="event-plate">
              <img src={mark} alt="" aria-hidden="true" loading="lazy" />
            </div>
            <h3>{label}</h3>
            <p className="event-meta">
              <b>{t(`cv.events.${key}.issuer`)}</b>
              <span>{t(`cv.events.${key}.year`)}</span>
            </p>
            <p>{t(`cv.events.${key}.body`)}</p>
            {paragraphs === 2 ? <p>{t(`cv.events.${key}.body2`)}</p> : null}
            <div className="event-links">
              <a className="cv-interest-link" href={url} target="_blank" rel="noopener noreferrer">
                {t(`cv.events.${key}.link`)}
                <ArrowUpRight />
              </a>
              {/* Only where the day produced something catalogued here. */}
              {project ? (
                <Link className="cv-interest-link" to={project}>
                  {t(`cv.events.${key}.projectLink`)}
                  <ArrowRight />
                </Link>
              ) : null}
            </div>
          </>
        );
      }}
    />
  );
};

export default EventsRail;
