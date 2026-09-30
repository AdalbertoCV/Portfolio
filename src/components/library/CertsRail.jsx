import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowUpRight } from '../brand/parts';
import { CERT_DOMAINS, CERT_ITEMS } from '../about/certsData';
import CertSky from './CertSky';
import SpotlightRail from './SpotlightRail';

// The credentials, one at a time, with the sky that grows as the list does
// beside them. The cards said what each one is; the sky says how many there are
// and in what order they came, which a column of cards never could. See
// SpotlightRail for the rail and CertSky for the drawing.

const CertsRail = ({ onProof }) => {
  const { t } = useTranslation();

  const items = CERT_ITEMS.map((cert) => ({
    ...cert,
    label: t(`cv.certs.${cert.key}.name`),
    group: cert.domain,
  }));
  const groups = CERT_DOMAINS.map((id) => ({ id, label: t(`cv.certDomains.${id}`) }));

  return (
    <SpotlightRail
      items={items}
      groups={groups}
      allLabel={t('cv.certsAll')}
      idPrefix="cert"
      className="cv-spot cv-spot--certs"
      prevLabel={t('cv.certsPrev')}
      nextLabel={t('cv.certsNext')}
      renderPanel={({ index, live, item, count, items: shown }) => {
        const years = shown.map((cert) => cert.year);
        const span = Math.min(...years) === Math.max(...years) ? `${years[0]}` : `${Math.min(...years)}–${Math.max(...years)}`;
        return (
          <CertSky
            items={shown}
            index={index}
            live={live}
            subject={item ? item.label : ''}
            meta={
              <>
                <b>{count}</b> {t('cv.skyStars')} · {span}
              </>
            }
          />
        );
      }}
      renderCard={(cert) => {
        const { key, links, proof, label } = cert;
        // translate() hands back the key itself on a miss, so a credential
        // without a written-up context renders as the plain credential.
        const body = t(`cv.certs.${key}.body`);
        const hasBody = body !== `cv.certs.${key}.body`;
        return (
          <>
            <div className="cert-plate">
              <svg
                className="cert-plate-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="9" r="5.5" />
                <path d="m8.2 13.6-1.4 7L12 18l5.2 2.6-1.4-7" />
              </svg>
              <p className="cert-plate-meta">
                <b>{t(`cv.certs.${key}.issuer`)}</b>
                <span>{t(`cv.certs.${key}.year`)}</span>
              </p>
            </div>
            <h3>{label}</h3>
            {hasBody && <p>{body}</p>}
            {links ? (
              <div className="cv-cert-links">
                {links.map(({ id, href }) => (
                  <a
                    className="cv-interest-link cv-cert-link"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={id}
                  >
                    {t(`cv.certs.${key}.links.${id}`)}
                    <ArrowUpRight />
                  </a>
                ))}
              </div>
            ) : null}
            {proof ? (
              <button
                type="button"
                className="cert-proof"
                onClick={() => onProof({ src: proof, label })}
                aria-label={label}
              >
                <img src={proof} alt={label} loading="lazy" />
                <span>{t('cv.certsProofHint')}</span>
              </button>
            ) : null}
          </>
        );
      }}
    />
  );
};

export default CertsRail;
