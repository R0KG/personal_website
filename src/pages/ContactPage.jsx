import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@nsmr/pixelart-react';
import { FaFileArrowDown, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { SiTelegram } from 'react-icons/si';
import AppLink from '../components/AppLink';
import PageShell from '../components/PageShell';
import { fadeUp } from '../lib/motion';
import cvPdf from '../../Roman_Merkulov_CV-1.pdf';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
];

const githubUrl = 'https://github.com/R0KG';
const linkedinUrl = 'https://www.linkedin.com/in/roman-merk/';
const emailAddress = 'int1994019@gmail.com';
const emailHref = 'mailto:int1994019@gmail.com';
const phoneNumber = '+43 6601337153';
const phoneHref = 'tel:+436601337153';
const whatsappUrl = 'https://wa.me/436601337153';
const telegramUrl = 'https://t.me/R0MKG';
const telegramLabel = 't.me/R0MKG';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') || 'there';
    setStatus(`Thanks, ${name}. Wire this form to your backend or Formspree endpoint.`);
  }

  return (
    <PageShell
      activeKey="contact"
      sidebarTitle="Rank: Commander"
      sidebarSubtitle="Level 94"
      sidebarCtaLabel="Contact Me"
      sidebarCtaHref={emailHref}
      footerText="Good projects usually start with a better definition of the problem."
      footerLinks={footerLinks}
      fabHref={emailHref}
    >
      <motion.section className="contact-page" {...fadeUp()}>
        <div className="contact-hero">
          <h1>Contact</h1>
          <p>
            Secure communication uplink protocol. Established connection with ROMAN_MERK terminal.
            Awaiting mission parameters.
          </p>
        </div>

        <div className="contact-layout">
          <article className="contact-form-panel">
            <div className="contact-form-panel__status">Status: standby</div>
            <form className="contact-terminal-form" id="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Identity_label</span>
                <input type="text" name="name" placeholder="SUBJECT_NAME" required />
              </label>
              <label>
                <span>Return_address</span>
                <input type="email" name="email" placeholder="COMM_CHANNEL@SECURE.NET" required />
              </label>
              <label>
                <span>Mission_details</span>
                <textarea name="scope" rows="7" placeholder="INPUT_DATA_STREAM..." required></textarea>
              </label>
              <div className="contact-terminal-form__footer">
                <small>Encryption: AES-256-BIT_ENABLED</small>
                <button className="contact-submit" type="submit">
                  Transmit_Now
                </button>
              </div>
              <div className="contact-terminal-form__status" aria-live="polite">
                {status}
              </div>
            </form>
          </article>

          <aside className="contact-side">
            <div className="contact-info-panel">
              <h2>Direct_uplink</h2>
              <div className="contact-info-list">
                <div>
                  <span className="contact-info-icon">
                    <Icon name="device-phone" />
                  </span>
                  <div>
                    <strong>Phone_link</strong>
                    <p><AppLink to={phoneHref}>{phoneNumber}</AppLink></p>
                  </div>
                </div>
                <div>
                  <span className="contact-info-icon contact-info-icon--gold">
                    <Icon name="mail" />
                  </span>
                  <div>
                    <strong>Email_node</strong>
                    <p><AppLink to={emailHref}>{emailAddress}</AppLink></p>
                  </div>
                </div>
                <div>
                  <span className="contact-info-icon contact-info-icon--blue">
                    <Icon name="github" />
                  </span>
                  <div>
                    <strong>Git_node</strong>
                    <p><AppLink to={githubUrl} target="_blank" rel="noreferrer">github.com/R0KG</AppLink></p>
                  </div>
                </div>
                <div>
                  <span className="contact-info-icon contact-info-icon--share contact-info-icon--brand">
                    <FaLinkedinIn aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Linked_channel</strong>
                    <p><AppLink to={linkedinUrl} target="_blank" rel="noreferrer">linkedin.com/in/roman-merk</AppLink></p>
                  </div>
                </div>
                <div>
                  <span className="contact-info-icon contact-info-icon--green contact-info-icon--brand">
                    <FaWhatsapp aria-hidden="true" />
                  </span>
                  <div>
                    <strong>WhatsApp_link</strong>
                    <p><AppLink to={whatsappUrl} target="_blank" rel="noreferrer">{phoneNumber}</AppLink></p>
                  </div>
                </div>
                <div>
                  <span className="contact-info-icon contact-info-icon--cyan contact-info-icon--brand">
                    <SiTelegram aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Telegram_channel</strong>
                    <p><AppLink to={telegramUrl} target="_blank" rel="noreferrer">{telegramLabel}</AppLink></p>
                  </div>
                </div>
                <div>
                  <span className="contact-info-icon contact-info-icon--gold contact-info-icon--brand">
                    <FaFileArrowDown aria-hidden="true" />
                  </span>
                  <div>
                    <strong>CV_archive</strong>
                    <p><AppLink to={cvPdf} download="Roman_Merkulov_CV.pdf" target="_blank" rel="noreferrer">Download PDF dossier</AppLink></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-map-panel">
              <div className="contact-presence-card">
                <div className="contact-presence-card__bg" aria-hidden="true"></div>

                <div className="contact-presence-card__header">
                  <span>PRESENCE_DATA</span>
                  <span aria-hidden="true">█</span>
                </div>

                <div className="contact-presence-list">
                  <div className="contact-presence-row">
                    <span className="contact-presence-row__icon" aria-hidden="true">
                      <Icon name="map" />
                    </span>
                    <div className="contact-presence-row__body">
                      <span className="contact-presence-row__label">GEO_LOC //</span>
                      <strong className="contact-presence-row__value">Vienna, Austria [UTC+1]</strong>
                    </div>
                  </div>

                  <div className="contact-presence-row">
                    <span className="contact-presence-row__icon" aria-hidden="true">
                      <Icon name="radio-tower" />
                    </span>
                    <div className="contact-presence-row__body">
                      <span className="contact-presence-row__label">OP_MODE //</span>
                      <strong className="contact-presence-row__value">Global Remote / Async / Call-Ready</strong>
                    </div>
                  </div>

                  <div className="contact-presence-row">
                    <span className="contact-presence-row__icon" aria-hidden="true">
                      <Icon name="calendar-check" />
                    </span>
                    <div className="contact-presence-row__body">
                      <span className="contact-presence-row__label">COMMS_WINDOW //</span>
                      <strong className="contact-presence-row__value">Replies during active work windows</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <motion.footer className="contact-footer-strip" {...fadeUp(0.08)}>
          <span>v.4.0.2_stable</span>
          <span>System clock: 02:44:11 utc+8</span>
          <span>Proximity_alert: active</span>
          <span>© 1994-2024 merk_corp</span>
        </motion.footer>
      </motion.section>
    </PageShell>
  );
}
