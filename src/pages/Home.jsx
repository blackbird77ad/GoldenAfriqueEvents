import { Link } from 'react-router-dom';
import { ChevronRight, Phone, MessageCircle, Instagram } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE, instagramLink, INSTAGRAM } from '../data/contact';


const STATS = [
  { icon: '🍽️', label: 'African Catering'   },
  { icon: '🎪', label: 'Event Rentals'       },
  { icon: '✨', label: 'Full Event Setup'    },
  { icon: '📞', label: 'Quick Response'      },
];

function StatItem({ icon, label }) {
  return (
    <div style={{
      textAlign: 'center', padding: '2.6rem 1.5rem',
      borderRight: '1px solid rgba(245,200,66,0.1)',
    }}>
      <div style={{ fontSize: '2rem', marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>
        {label}
      </div>
    </div>
  );
}

const SERVICES = [
  { n: '01', icon: '🍽️', title: 'African Catering',
    desc: 'Authentic African dishes for any occasion. Jollof, Banku, Fufu, Waakye, Kenkey and much more. Each order comes with your choice of meat or fish, vegetables and salad.',
    link: '/catering', cta: 'Order Food' },
  { n: '02', icon: '🎪', title: 'Event Rentals',
    desc: 'Full decor and equipment hire. Chairs, tables, backdrops, charger plates, food warmers, tents and over 80 items to transform any venue into something extraordinary.',
    link: '/rentals', cta: 'Browse Rentals' },
  { n: '03', icon: '✨', title: 'Full Event Setup',
    desc: 'We handle everything from decor and food to equipment setup so you can enjoy your special day without any stress. From intimate gatherings to grand celebrations.',
    link: '/contact', cta: 'Get In Touch' },
];

const OCCASIONS = [
  'Weddings','Birthday Parties','Baby Showers','Corporate Events',
  'Funerals','Naming Ceremonies','Graduations','Family Gatherings',
  'Bridal Showers','Church Events',
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

const WA = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Golden Afrique Event!\n\nI would like to place an order. Please share availability and pricing. Thank you!')}`;

export default function Home() {
  return (
    <div style={{ paddingTop: 92 }}>

      {/* HERO, dark image backdrop, text over it. Clean, no yellow flood */}
      <section style={{
        minHeight: 'calc(100vh - 92px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background image */}
        <img
          src="/Events-decor/scuba-table-cover-white.jpg"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'center' }}
        />
        {/* Dark overlay, reads perfectly on any screen */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(44,26,6,0.82) 0%, rgba(44,26,6,0.65) 60%, rgba(44,26,6,0.78) 100%)' }}/>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '3rem 1.5rem', maxWidth: 700 }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
            Catering and Event Rentals
          </p>

          <h1 style={{
            fontSize: 'clamp(2.8rem,8vw,6.5rem)', fontWeight: 900, lineHeight: 1,
            color: '#fff', textTransform: 'uppercase',
            fontFamily: 'Georgia,serif', marginBottom: 20,
          }}>
            Golden<br/>
            <span style={{ color: 'var(--gold)' }}>Afrique</span><br/>
            Event
          </h1>

          <p style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.9, maxWidth: 460, margin: '0 auto 2.5rem' }}>
            Authentic African catering and full event decor hire. We bring the food, the setup and the elegance.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{
              background: 'var(--gold)', color: 'var(--brown-dark)',
              padding: '15px 30px', fontWeight: 900, fontSize: '0.8rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 3,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <MessageCircle size={17}/> Order on WhatsApp
            </a>
            <Link to="/catering" style={{
              background: 'transparent', color: '#fff',
              padding: '15px 30px', fontWeight: 900, fontSize: '0.8rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 3,
              border: '2px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              View Menu <ChevronRight size={16}/>
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 1, height: 36, background: 'rgba(245,200,66,0.4)', animation: 'pulse 1.8s ease-in-out infinite' }}/>
          <div style={{ width: 1, height: 16, background: 'var(--gold)' }}/>
        </div>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section style={{ background: 'var(--brown-dark)', borderTop: '3px solid var(--gold)', borderBottom: '2px solid rgba(245,200,66,0.2)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          {STATS.map((s, i) => <StatItem key={i} {...s} />)}
        </div>
      </section>

      {/* SERVICES, cream bg, not gold */}
      <section style={{ background: 'var(--cream)', padding: '5.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--brown)', marginBottom: 10 }}>
              What We Offer
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'var(--brown-dark)', fontFamily: 'Georgia,serif', lineHeight: 1.15 }}>
              Everything for Your<br/>Perfect Occasion
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
            {SERVICES.map(s => (
              <div key={s.title}
                style={{ background: '#fff', border: '1.5px solid var(--brown-pale)', borderRadius: 4, padding: '2.5rem 2rem', transition: 'border-color 0.25s, transform 0.2s, box-shadow 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(44,26,6,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--brown-pale)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: 'rgba(197,162,39,0.18)', fontFamily: 'Georgia,serif', marginBottom: 10 }}>{s.n}</div>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontWeight: 900, fontSize: '1rem', color: 'var(--brown-dark)', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--brown)', lineHeight: 1.85, marginBottom: 20 }}>{s.desc}</p>
                <Link to={s.link} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 900, color: 'var(--brown-dark)', textDecoration: 'none', background: 'var(--gold)', padding: '8px 16px', borderRadius: 3 }}>
                  {s.cta} <ChevronRight size={14}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS, dark bg, not gold */}
      <section style={{ background: 'var(--brown-dark)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
            Perfect For
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: '#fff', fontFamily: 'Georgia,serif', marginBottom: '2rem' }}>
            Every Occasion
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {OCCASIONS.map(e => (
              <span key={e}
                style={{ padding: '9px 20px', border: '1.5px solid rgba(245,200,66,0.35)', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', borderRadius: 3, transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={ev => { ev.currentTarget.style.background = 'var(--gold)'; ev.currentTarget.style.color = 'var(--brown-dark)'; ev.currentTarget.style.borderColor = 'var(--gold)'; ev.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={ev => { ev.currentTarget.style.background = 'transparent'; ev.currentTarget.style.color = 'rgba(255,255,255,0.85)'; ev.currentTarget.style.borderColor = 'rgba(245,200,66,0.35)'; ev.currentTarget.style.transform = ''; }}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY TEASER, white bg */}
      <section style={{ background: '#fff', padding: '5.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--brown)', marginBottom: 8 }}>Our Work</p>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'var(--brown-dark)', fontFamily: 'Georgia,serif' }}>Past Events</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.6rem' }}>
            {GALLERY.map((src, i) => (
              <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: 4 }}>
                <img src={src} alt={`Event ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'var(--brown-dark)', color: 'var(--gold)', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3 }}>
              View Full Gallery <ChevronRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA, gold bg, minimal usage */}
      <section style={{ background: 'var(--gold)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'var(--brown-dark)', fontFamily: 'Georgia,serif', marginBottom: 12 }}>
            Ready to plan your event?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--brown)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Reach out on WhatsApp, call or DM us on Instagram. We respond quickly.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 26px', background: 'var(--brown-dark)', color: 'var(--gold)', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3 }}>
              <MessageCircle size={17}/> WhatsApp Us
            </a>
            <a href="tel:+18159051230" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 26px', border: '2px solid var(--brown-dark)', color: 'var(--brown-dark)', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3, background: 'transparent' }}>
              <Phone size={17}/> (815) 905-1230
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 26px', border: '2px solid var(--brown-dark)', color: 'var(--brown-dark)', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3, background: 'transparent' }}>
              <Instagram size={17}/> Instagram
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}