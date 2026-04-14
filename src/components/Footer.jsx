import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Instagram, UtensilsCrossed } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE, instagramLink, INSTAGRAM } from '../data/contact';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--brown-dark)', borderTop: '4px solid var(--gold)', color: 'var(--brown-pale)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, background: 'var(--gold)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UtensilsCrossed size={18} color="var(--brown-dark)" />
            </div>
            <div>
              <div style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1rem' }}>
                Golden Afrique Event
              </div>
              <div style={{ color: 'var(--brown-light)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                Catering and Rentals
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.84rem', lineHeight: 1.85, color: 'var(--brown-light)' }}>
            Bringing authentic African flavour and elegant decor to every occasion. From Jollof to gold centrepieces.
          </p>
        </div>

        {/* Links */}
        <div>
          <div style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
            Quick Links
          </div>

          {[['/', 'Home'], ['/catering', 'Catering'], ['/rentals', 'Rentals'], ['/gallery', 'Gallery'], ['/contact', 'Contact']].map(([path, label]) => (
            <Link key={path} to={path} style={{ display: 'block', color: 'var(--brown-light)', fontSize: '0.84rem', marginBottom: 8, textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
            Get In Touch
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> WhatsApp Us
            </a>

            <a href={`tel:${PHONE}`}>
              <Phone size={16} /> {PHONE}
            </a>

            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <Instagram size={16} /> {INSTAGRAM}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(245,200,66,0.15)', padding: '1.2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem' }}>
          2026 Golden Afrique Event. All rights reserved.
        </p>

        <p style={{ fontSize: '0.72rem' }}>
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