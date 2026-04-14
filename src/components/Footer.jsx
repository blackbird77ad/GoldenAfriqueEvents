import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Mail,
  Facebook,
  Music2,
  UtensilsCrossed,
} from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE } from '../data/contact';

const EMAIL = 'goldenafriqueevent@gmail.com';
const FACEBOOK_LINK = 'https://www.facebook.com/share/p/18LTtfwCVY/';
const TIKTOK_LINK = 'https://www.tiktok.com/@golden.afrique.ca?_r=1&_t=ZT-95WE9AyllCY';

const contactLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: 'var(--brown-light)',
  fontSize: '0.84rem',
  textDecoration: 'none',
  lineHeight: 1.6,
};

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--brown-dark)',
        borderTop: '4px solid var(--gold)',
        color: 'var(--brown-pale)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '4rem 1.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: 'var(--gold)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UtensilsCrossed size={18} color="var(--brown-dark)" />
            </div>

            <div>
              <div style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1rem' }}>
                Golden Afrique Event
              </div>
              <div
                style={{
                  color: 'var(--brown-light)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Catering and Rentals
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.84rem', lineHeight: 1.85, color: 'var(--brown-light)' }}>
            Bringing authentic African flavour and elegant décor to every occasion in Chicago,
            Illinois, USA. From Jollof to gold centrepieces.
          </p>
        </div>

        {/* Links */}
        <div>
          <div
            style={{
              color: 'var(--gold)',
              fontWeight: 900,
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Quick Links
          </div>

          {[
            ['/', 'Home'],
            ['/catering', 'Catering'],
            ['/rentals', 'Rentals'],
            ['/gallery', 'Gallery'],
            ['/contact', 'Contact'],
          ].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              style={{
                display: 'block',
                color: 'var(--brown-light)',
                fontSize: '0.84rem',
                marginBottom: 8,
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              color: 'var(--gold)',
              fontWeight: 900,
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Get In Touch
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              style={contactLinkStyle}
            >
              <MessageCircle size={16} />
              <span>WhatsApp Us</span>
            </a>

            <a href={`tel:${PHONE}`} style={contactLinkStyle}>
              <Phone size={16} />
              <span>{PHONE}</span>
            </a>

            <a href={`mailto:${EMAIL}`} style={contactLinkStyle}>
              <Mail size={16} />
              <span>{EMAIL}</span>
            </a>

            <a
              href={FACEBOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={contactLinkStyle}
            >
              <Facebook size={16} />
              <span>Facebook</span>
            </a>

            <a
              href={TIKTOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={contactLinkStyle}
            >
              <Music2 size={16} />
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          borderTop: '1px solid rgba(245,200,66,0.15)',
          padding: '1.2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '0.72rem', margin: 0 }}>
          2026 Golden Afrique Event. All rights reserved.
        </p>

        <p style={{ fontSize: '0.72rem', marginTop: 8 }}>
          Built by{' '}
          <a
            href="https://thebrandhelper.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 800, textDecoration: 'none' }}
          >
            <span style={{ color: '#ffffff' }}>The Brand</span>
            <span style={{ color: '#D96C6C' }}>Helper</span>
          </a>
        </p>
      </div>
    </footer>
  );
}