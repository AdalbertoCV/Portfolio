import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n/I18nProvider';
import en from '../../i18n/en';
import { CERT_ITEMS } from '../about/certsData';
import SpotlightRail from './SpotlightRail';
import CertsRail from './CertsRail';

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
