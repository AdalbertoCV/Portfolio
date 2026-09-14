import { useState } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import { ArrowUpRight, Reveal, Section } from '../brand/parts';
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
const ACCESS_KEY = '6b54da08-526a-4df8-aee1-8f8885e6a9e7';
const EMAIL = 'adalc3488@gmail.com';

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
        <a className="contact-direct" href={`mailto:${EMAIL}`}>
          {EMAIL}
          <ArrowUpRight />
        </a>
      </Reveal>

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
            <input type="checkbox" name="botcheck" className="contact-botcheck" tabIndex="-1" autoComplete="off" />

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
