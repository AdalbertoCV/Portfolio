import { useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Reveal, Section } from '../brand/parts';
import { CONTACT_EMAIL } from '../../site';
import './contact.css';

/* ==========================================================================
   The contact form.

   Web3Forms rather than a backend: this is a static build with nowhere to run
   server code, and the alternative — a mailto: link — hands the visitor a mail
   client they may not have configured and loses the message if they do not.

   The access key sits here in the source rather than in an environment
   variable, which sounds wrong and is not. Create React App inlines every
   REACT_APP_* value into the bundle at build time, so an env var would end up
   in exactly the same shipped JavaScript that this line does — it would buy no
   secrecy, only a second place to configure on every host the site is deployed
   to. A Web3Forms key is designed to be public and only ever delivers to the
   one address it was issued for, so the worst a copy of it can do is send mail
   to that address.
   ======================================================================== */

const ENDPOINT = 'https://api.web3forms.com/submit';

// Who the page is actually for. A form that opens with "¿de qué se trata?"
// puts the work of figuring that out on the visitor; naming the four reasons
// people write lets them recognise themselves and arrive at the box already
// knowing what to say. Three of them have a page that answers the follow-up
// question, so they link to it.
const REASONS = [
  { id: 'radii', to: '/radii' },
  { id: 'moonphase', to: '/moonphase' },
  { id: 'evodeps', to: '/evodeps' },
  { id: 'stackselect', to: '/stackselect' },
  { id: 'build', to: null },
  { id: 'ideas', to: null },
];
const ACCESS_KEY = '6b54da08-526a-4df8-aee1-8f8885e6a9e7';


const FIELDS = [
  { name: 'name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', type: 'email', autoComplete: 'email', required: true },
  { name: 'subject', type: 'text', autoComplete: 'off', required: true },
];

const ContactPage = () => {
  const { t } = useTranslation();
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    data.append('access_key', ACCESS_KEY);
    // Shown in the subject line of the mail that arrives, so a message is
    // identifiable without opening it.
    data.append('from_name', 'Portafolio — adalcerrillo');

    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, { method: 'POST', body: data });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'send failed');
      setStatus('sent');
      form.reset();
    } catch (error) {
      // The address is offered as the fallback in the error copy, so a failure
      // here is never a dead end.
      setStatus('error');
    }
  };

  return (
    <div className="cv-page">
      <Reveal className="contact-head">
        <span className="hub-badge">{t('contact.badge')}</span>
        <h1 className="cv-name">{t('contact.title')}</h1>
        <p className="cv-role">{t('contact.lede')}</p>
        <a className="contact-direct" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
          <ArrowUpRight />
        </a>
      </Reveal>

      <Section kicker={t('contact.reasonsKicker')} title={t('contact.reasonsTitle')}>
        <Reveal className="reasons" stagger>
          {REASONS.map(({ id, to }) => (
            <article className="reason" key={id}>
              <h3>{t(`contact.reasons.${id}.title`)}</h3>
              <p>{t(`contact.reasons.${id}.body`)}</p>
              {to ? (
                <Link className="reason-link" to={to}>
                  {t(`contact.reasons.${id}.link`)}
                  <ArrowRight />
                </Link>
              ) : null}
            </article>
          ))}
        </Reveal>
        <Reveal>
          <p className="reasons-note">{t('contact.reasonsNote')}</p>
        </Reveal>
      </Section>

      <Section>
        <Reveal className="contact-card">
          {/* A "did not send" sitting next to a form the visitor has already
              started rewriting is stale advice, so the outcome clears on the
              first keystroke after it. */}
          <form
            className="contact-form"
            onSubmit={onSubmit}
            onInput={() => setStatus((s) => (s === 'sent' || s === 'error' ? 'idle' : s))}
          >
            {FIELDS.map(({ name, type, autoComplete, required }) => (
              <label className="contact-field" key={name} data-span={name === 'subject' ? 'full' : undefined}>
                <span className="contact-label">{t(`contact.fields.${name}`)}</span>
                <input
                  className="contact-input"
                  type={type}
                  name={name}
                  autoComplete={autoComplete}
                  required={required}
                  placeholder={t(`contact.placeholders.${name}`)}
                />
              </label>
            ))}

            <label className="contact-field" data-span="full">
              <span className="contact-label">{t('contact.fields.message')}</span>
              <textarea
                className="contact-input contact-textarea"
                name="message"
                rows="7"
                required
                placeholder={t('contact.placeholders.message')}
              />
            </label>

            {/* Web3Forms' own honeypot. A bot fills every field it finds; a
                person never sees this one. */}
            {/* aria-hidden as well as off-screen: positioned at -9999px it is
                still in the accessibility tree, so a screen-reader user was
                being read "botcheck, checkbox, unchecked" in the middle of the
                form. */}
            <input
              type="checkbox"
              name="botcheck"
              className="contact-botcheck"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="contact-actions">
              <button className="contact-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>

              {/* One live region for every outcome, so a screen reader is told
                  what happened without the message jumping around the form. */}
              <p className="contact-status" role="status" aria-live="polite" data-state={status}>
                {status === 'sent' && t('contact.sent')}
                {status === 'error' && t('contact.error')}
              </p>
            </div>
          </form>
        </Reveal>
      </Section>
    </div>
  );
};

export default ContactPage;
