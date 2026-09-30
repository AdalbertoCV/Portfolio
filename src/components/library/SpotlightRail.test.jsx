import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import en from '../../i18n/en';
import { CERT_ITEMS } from '../about/certsData';
import { EVENT_ITEMS } from '../about/eventsData';
import REFERENCES from '../about/references';
import SpotlightRail from './SpotlightRail';
import CertsRail from './CertsRail';
import EventsRail from './EventsRail';
import PeopleRail from './PeopleRail';

const many = Array.from({ length: 30 }, (_, i) => ({
  key: `item-${i}`,
  label: `Item ${i}`,
  tone: '#a78bfa',
  group: i % 3 === 0 ? 'a' : 'b',
}));

const renderMany = (props = {}) =>
  render(
    <SpotlightRail
      items={many}
      groups={[
        { id: 'a', label: 'Kind A' },
        { id: 'b', label: 'Kind B' },
      ]}
      allLabel="All"
      idPrefix="t"
      prevLabel="Back"
      nextLabel="Forward"
      renderPanel={({ count, item }) => (
        <p data-testid="panel">
          {count}:{item.key}
        </p>
      )}
      renderCard={(item) => <h3>{item.label}</h3>}
      {...props}
    />,
  );

// The point of the rail is that a list can grow without the page growing with
// it: forty cards must still be one card, one row of controls and a drawing.
test('past a row of dots it becomes a counter, and still shows one card at a time', () => {
  const { container } = renderMany();
  expect(container.querySelectorAll('.cv-interest-dot')).toHaveLength(0);
  expect(container.querySelector('.cv-spot-count')).toHaveTextContent('01 / 30');
  // Every card is in the document; only the one in view is reachable.
  expect(container.querySelectorAll('.cv-interest')).toHaveLength(30);
  expect(container.querySelectorAll('.cv-interest[inert]')).toHaveLength(29);
  fireEvent.click(screen.getByRole('button', { name: 'Forward' }));
  expect(container.querySelector('.cv-spot-count')).toHaveTextContent('02 / 30');
  expect(screen.getByTestId('panel')).toHaveTextContent('30:item-1');
});

test('the filters narrow the list, the counter and the drawing together', () => {
  const { container } = renderMany();
  fireEvent.click(screen.getByRole('button', { name: 'Kind A' }));
  expect(container.querySelectorAll('.cv-interest')).toHaveLength(10);
  expect(container.querySelector('.cv-spot-count')).toHaveTextContent('01 / 10');
  expect(screen.getByTestId('panel')).toHaveTextContent('10:item-0');
  fireEvent.click(screen.getByRole('button', { name: 'All' }));
  expect(container.querySelectorAll('.cv-interest')).toHaveLength(30);
});

test('a short list keeps its dots and shows no filters', () => {
  const { container } = renderMany({ items: many.slice(0, 5) });
  expect(container.querySelectorAll('.cv-interest-dot')).toHaveLength(5);
  expect(container.querySelector('.cv-spot-filter')).toBeNull();
});

test('the credentials are a rail with a sky beside it, one card at a time', () => {
  const { container } = render(
    <I18nProvider>
      <MemoryRouter>
        <CertsRail onProof={() => {}} />
      </MemoryRouter>
    </I18nProvider>,
  );
  expect(container.querySelectorAll('.cv-interest')).toHaveLength(CERT_ITEMS.length);
  expect(container.querySelectorAll('.cv-interest-dot')).toHaveLength(CERT_ITEMS.length);
  expect(container.querySelector('.cv-sky')).not.toBeNull();
  // The name is on the card and on the readout of the sky beside it.
  expect(screen.getAllByText(en.cv.certs.icp.name).length).toBeGreaterThanOrEqual(2);
  // Nothing was lost in the move: SOMECE still carries its two links, and the
  // constancia is inside its card.
  const somece = document.getElementById('cert-card-somece');
  expect(somece.querySelectorAll('.cv-cert-link')).toHaveLength(2);
  expect(somece.querySelector('.cert-proof')).not.toBeNull();
});

test('every credential has a year, a tone and text in both languages', () => {
  CERT_ITEMS.forEach(({ key, year, tone }) => {
    expect(Number.isInteger(year)).toBe(true);
    expect(tone).toMatch(/^#[0-9a-f]{6}$/i);
    expect(en.cv.certs[key].name).toBeTruthy();
  });
});

const inApp = (node) =>
  render(
    <I18nProvider>
      <MemoryRouter>{node}</MemoryRouter>
    </I18nProvider>,
  );

test('the events are a rail with a map beside it, on the right', () => {
  const { container } = inApp(<EventsRail />);
  expect(container.querySelectorAll('.cv-interest')).toHaveLength(EVENT_ITEMS.length);
  expect(container.querySelector('.cv-map')).not.toBeNull();
  // The drawing alternates sides down the page: certificates left, events right.
  expect(container.querySelector('.cv-spot--flip')).not.toBeNull();
  // Nothing was lost in the move: the long entry keeps both paragraphs and the
  // link to the project it turned into.
  const rbr = document.getElementById('event-card-rbr');
  expect(rbr.querySelectorAll('p').length).toBeGreaterThanOrEqual(3);
  expect(rbr.querySelector('a[href="/projects"]')).not.toBeNull();
});

test('the people are a rail with a network beside it, on the left, and nobody is quoted', () => {
  // jsdom has no matchMedia, and the avatars ask whether motion is reduced.
  window.matchMedia = () => ({ matches: true });
  const { container } = inApp(<PeopleRail />);
  expect(container.querySelectorAll('.cv-interest')).toHaveLength(REFERENCES.length);
  expect(container.querySelector('.cv-net')).not.toBeNull();
  expect(container.querySelector('.cv-spot--flip')).toBeNull();
  // Every card still hands over a LinkedIn link.
  REFERENCES.forEach(({ id, linkedin }) => {
    const card = document.getElementById(`person-card-${id}`);
    expect(card.querySelector(`a[href="${linkedin}"]`)).not.toBeNull();
  });
});

test('every event and person has what the drawings need', () => {
  EVENT_ITEMS.forEach(({ lon, lat, when, tone, city }) => {
    expect(lon).toBeLessThan(-80);
    expect(lat).toBeGreaterThan(14);
    expect(Number.isFinite(when)).toBe(true);
    expect(tone).toMatch(/^#[0-9a-f]{6}$/i);
    expect(city).toBeTruthy();
  });
  REFERENCES.forEach(({ glow, roles }) => {
    expect(glow).toMatch(/^#[0-9a-f]{6}$/i);
    expect(roles.length).toBeGreaterThan(0);
  });
});

// On a phone a swipe across the card turns it, on release. The card does not
// follow the finger; and a thumb scrolling the page, which drifts sideways, must
// not be read as a swipe.
const swipe = (rail, [x0, y0], [x1, y1]) => {
  fireEvent.touchStart(rail, { touches: [{ clientX: x0, clientY: y0 }] });
  fireEvent.touchEnd(rail, { changedTouches: [{ clientX: x1, clientY: y1 }] });
};

test('a sideways swipe across the card turns it, and scrolling does not', () => {
  const { container } = renderMany({ items: many.slice(0, 5) });
  const rail = container.querySelector('.cv-interests');
  const current = () => [...container.querySelectorAll('.cv-interest-dot')].findIndex((dot) => dot.getAttribute('aria-current') === 'true');
  expect(current()).toBe(0);
  swipe(rail, [300, 400], [180, 410]);
  expect(current()).toBe(1);
  swipe(rail, [180, 400], [300, 395]);
  expect(current()).toBe(0);
  // Mostly downward, a little sideways: a scroll, not a swipe.
  swipe(rail, [300, 400], [262, 600]);
  expect(current()).toBe(0);
  // Too short to mean it.
  swipe(rail, [300, 400], [270, 400]);
  expect(current()).toBe(0);
  // The first card has nothing before it.
  swipe(rail, [180, 400], [300, 400]);
  expect(current()).toBe(0);
});
