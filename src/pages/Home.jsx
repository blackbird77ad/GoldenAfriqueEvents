import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Phone,
  MessageCircle,
  Facebook,
  Music2,
} from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE } from '../data/contact';

const FACEBOOK_LINK = 'https://www.facebook.com/share/p/18LTtfwCVY/';
const TIKTOK_LINK = 'https://www.tiktok.com/@golden.afrique.ca?_r=1&_t=ZT-95WE9AyllCY';
const EMAIL = 'goldenafriqueevent@gmail.com';

const STATS = [
  { icon: '🍽️', label: 'African Catering' },
  { icon: '🎪', label: 'Event Rentals' },
  { icon: '✨', label: 'Full Event Setup' },
  { icon: '📍', label: 'Chicago Service Area' },
];

function StatItem({ icon, label }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2.6rem 1.5rem',
        borderRight: '1px solid rgba(245,200,66,0.1)',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: 10 }}>{icon}</div>
      <div
        style={{
          fontSize: '0.7rem',
          fontWeight: 800,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

const SERVICES = [
  {
    n: '01',
    icon: '🍽️',
    title: 'African Catering',
    desc: 'Authentic African dishes for any occasion. Jollof, Banku, Fufu, Waakye, Kenkey and much more. Each order comes with your choice of meat or fish, vegetables and salad.',
    link: '/catering',
    cta: 'Order Food',
  },
  {
    n: '02',
    icon: '🎪',
    title: 'Event Rentals',
    desc: 'Full decor and equipment hire. Chairs, tables, backdrops, charger plates, food warmers, tents and over 80 items to transform any venue into something extraordinary.',
    link: '/rentals',
    cta: 'Browse Rentals',
  },
  {
    n: '03',
    icon: '✨',
    title: 'Full Event Setup',
    desc: 'We handle everything from decor and food to equipment setup so you can enjoy your special day without any stress. From intimate gatherings to grand celebrations.',
    link: '/contact',
    cta: 'Get In Touch',
  },
];

const OCCASIONS = [
  'Weddings',
  'Birthday Parties',
  'Baby Showers',
  'Corporate Events',
  'Funerals',
  'Naming Ceremonies',
  'Graduations',
  'Family Gatherings',
  'Bridal Showers',
  'Church Events',
];

const GALLERY = [
  '/Events-decor/stage-setup-candles-chairs-backdrop.jpg',
  '/Events-decor/serpentine-throne-table-chairs.jpg',
  '/Events-decor/golden-centerpiece.jpg',
  '/Events-decor/backdrop-gold.png',
  '/Events-decor/charger-setup.png',
  '/Events-decor/high-chairs-bridal.jpg',
  '/Events-decor/double-layer-stage-setup.jpg',
  '/catering-services/party-serving-banku-pepper-tilapia.png',
];

const WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hello Golden Afrique Event!\n\nI would like to place an order. Please share availability and pricing. Thank you!'
)}`;

const socialButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '14px 26px',
  border: '2px solid var(--brown-dark)',
  color: 'var(--brown-dark)',
  fontWeight: 900,
  fontSize: '0.8rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  borderRadius: 3,
  background: 'transparent',
};

export default function Home() {
  return (
    <div style={{ paddingTop: 92 }}>
      {/* HERO */}
      <section
        style={{
          minHeight: 'calc(100vh - 92px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src="/Events-decor/scuba-table-cover-white.jpg"
          alt="Golden Afrique Event catering and décor setup"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            objectPosition: 'center',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg, rgba(44,26,6,0.82) 0%, rgba(44,26,6,0.65) 60%, rgba(44,26,6,0.78) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '3rem 1.5rem',
            maxWidth: 760,
          }}
        >
          <p
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 20,
            }}
          >
            Catering and Event Rentals
          </p>

          <h1
            style={{
              fontSize: 'clamp(2.8rem,8vw,6.5rem)',
              fontWeight: 900,
              lineHeight: 1,
              color: '#fff',
              textTransform: 'uppercase',
              fontFamily: 'Georgia,serif',
              marginBottom: 20,
            }}
          >
            Golden
            <br />
            <span style={{ color: 'var(--gold)' }}>Afrique</span>
            <br />
            Event
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.9rem,2vw,1.05rem)',
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.9,
              maxWidth: 560,
              margin: '0 auto 1rem',
            }}
          >
            Authentic African catering and full event décor hire in{' '}
            <strong>Chicago, Illinois, USA</strong>. We bring the food, the setup
            and the elegance to your events.
          </p>

          <p
            style={{
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.8,
              maxWidth: 520,
              margin: '0 auto 2.5rem',
            }}
          >
            Weddings, birthdays, family gatherings, church events and corporate
            occasions across Chicago and nearby areas.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--gold)',
                color: 'var(--brown-dark)',
                padding: '15px 30px',
                fontWeight: 900,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <MessageCircle size={17} />
              Order on WhatsApp
            </a>

            <Link
              to="/catering"
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '15px 30px',
                fontWeight: 900,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 3,
                border: '2px solid rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              View Menu <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <div
            style={{
              width: 1,
              height: 36,
              background: 'rgba(245,200,66,0.4)',
              animation: 'pulse 1.8s ease-in-out infinite',
            }}
          />
          <div style={{ width: 1, height: 16, background: 'var(--gold)' }} />
        </div>
      </section>

      {/* LOCATION SEO BOOST */}
      <section style={{ background: '#fff', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--brown)',
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            Golden Afrique Event proudly serves{' '}
            <strong>Chicago, Illinois, USA</strong> with African catering, party
            rentals, event décor, and full event setup services for private and
            corporate occasions.
          </p>
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section
        style={{
          background: 'var(--brown-dark)',
          borderTop: '3px solid var(--gold)',
          borderBottom: '2px solid rgba(245,200,66,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          }}
        >
          {STATS.map((s, i) => (
            <StatItem key={i} {...s} />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p
              style={{
                fontSize: '0.64rem',
                fontWeight: 800,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--brown)',
                marginBottom: 10,
              }}
            >
              What We Offer
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.8rem,4vw,2.8rem)',
                fontWeight: 900,
                color: 'var(--brown-dark)',
                fontFamily: 'Georgia,serif',
                lineHeight: 1.15,
              }}
            >
              Everything for Your
              <br />
              Perfect Occasion
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.2rem',
            }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.title}
                style={{
                  background: '#fff',
                  border: '1.5px solid var(--brown-pale)',
                  borderRadius: 4,
                  padding: '2.5rem 2rem',
                  transition:
                    'border-color 0.25s, transform 0.2s, box-shadow 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 32px rgba(44,26,6,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brown-pale)';
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div
                  style={{
                    fontSize: '1.9rem',
                    fontWeight: 900,
                    color: 'rgba(197,162,39,0.18)',
                    fontFamily: 'Georgia,serif',
                    marginBottom: 10,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{s.icon}</div>
                <h3
                  style={{
                    fontWeight: 900,
                    fontSize: '1rem',
                    color: 'var(--brown-dark)',
                    marginBottom: 8,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.83rem',
                    color: 'var(--brown)',
                    lineHeight: 1.85,
                    marginBottom: 20,
                  }}
                >
                  {s.desc}
                </p>
                <Link
                  to={s.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.8rem',
                    fontWeight: 900,
                    color: 'var(--brown-dark)',
                    textDecoration: 'none',
                    background: 'var(--gold)',
                    padding: '8px 16px',
                    borderRadius: 3,
                  }}
                >
                  {s.cta} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section style={{ background: 'var(--brown-dark)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 10,
            }}
          >
            Perfect For
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem,4vw,2.8rem)',
              fontWeight: 900,
              color: '#fff',
              fontFamily: 'Georgia,serif',
              marginBottom: '1rem',
            }}
          >
            Every Occasion
          </h2>

          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.8,
              maxWidth: 620,
              margin: '0 auto 2rem',
            }}
          >
            Serving families, churches, businesses and communities across
            Chicago, Illinois, USA.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {OCCASIONS.map((e) => (
              <span
                key={e}
                style={{
                  padding: '9px 20px',
                  border: '1.5px solid rgba(245,200,66,0.35)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.85)',
                  borderRadius: 3,
                  transition: 'all 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(ev) => {
                  ev.currentTarget.style.background = 'var(--gold)';
                  ev.currentTarget.style.color = 'var(--brown-dark)';
                  ev.currentTarget.style.borderColor = 'var(--gold)';
                  ev.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(ev) => {
                  ev.currentTarget.style.background = 'transparent';
                  ev.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                  ev.currentTarget.style.borderColor = 'rgba(245,200,66,0.35)';
                  ev.currentTarget.style.transform = '';
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ background: '#fff', padding: '5.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p
              style={{
                fontSize: '0.64rem',
                fontWeight: 800,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--brown)',
                marginBottom: 8,
              }}
            >
              Our Work
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.8rem,4vw,2.8rem)',
                fontWeight: 900,
                color: 'var(--brown-dark)',
                fontFamily: 'Georgia,serif',
              }}
            >
              Past Events
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '0.6rem',
            }}
          >
            {GALLERY.map((src, i) => (
              <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: 4 }}>
                <img
                  src={src}
                  alt={`Golden Afrique Event setup ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link
              to="/gallery"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 32px',
                background: 'var(--brown-dark)',
                color: 'var(--gold)',
                fontWeight: 900,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 3,
              }}
            >
              View Full Gallery <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gold)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.8rem,4vw,2.8rem)',
              fontWeight: 900,
              color: 'var(--brown-dark)',
              fontFamily: 'Georgia,serif',
              marginBottom: 12,
            }}
          >
            Ready to plan your event?
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--brown)',
              lineHeight: 1.8,
              marginBottom: '1rem',
            }}
          >
            Reach out on WhatsApp, call, email, Facebook or TikTok. We respond
            quickly.
          </p>

          <p
            style={{
              fontSize: '0.88rem',
              color: 'var(--brown-dark)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}
          >
            Serving <strong>Chicago, Illinois, USA</strong> with catering, rentals
            and event décor.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'center',
            }}
          >
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 26px',
                background: 'var(--brown-dark)',
                color: 'var(--gold)',
                fontWeight: 900,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 3,
              }}
            >
              <MessageCircle size={17} />
              WhatsApp Us
            </a>

            <a href={`tel:${PHONE}`} style={socialButtonStyle}>
              <Phone size={17} />
              {PHONE}
            </a>

            <a href={`mailto:${EMAIL}`} style={socialButtonStyle}>
              ✉
              <span>Email Us</span>
            </a>

            <a
              href={FACEBOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={socialButtonStyle}
            >
              <Facebook size={17} />
              Facebook
            </a>

            <a
              href={TIKTOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={socialButtonStyle}
            >
              <Music2 size={17} />
              TikTok
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}