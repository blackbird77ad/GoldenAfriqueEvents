import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';

const LINKS = [
  { path: '/',         label: 'Home'     },
  { path: '/catering', label: 'Catering' },
  { path: '/rentals',  label: 'Rentals'  },
  { path: '/gallery',  label: 'Gallery'  },
  { path: '/contact',  label: 'Contact'  },
];

export default function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [showCart,  setShowCart]  = useState(false);
  const location = useLocation();
  const { cateringCount, rentalCount } = useCart();
  const total = cateringCount + rentalCount;
  const active = path => location.pathname === path;

  useEffect(() => { setOpen(false); }, [location]);

  /* Navbar is always solid brown-dark , never transparent, never clashes */
  return (
    <nav style={{ background: 'var(--brown-dark)', borderBottom: '3px solid var(--gold-dark)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>

      {/* Top strip */}
      {/* <div style={{ background: 'var(--black)', color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', padding: '6px 1rem' }}>
        Call or Text: (815) 905-1230 &nbsp; | &nbsp; @goldenafriqueevent
      </div> */}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, background: 'var(--gold)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <UtensilsCrossed size={18} color="var(--brown-dark)" />
          </div>
          <div>
            <div style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1rem', lineHeight: 1.1 }}>Golden Afrique Event</div>
            <div style={{ color: 'var(--brown-light)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Catering and Rentals</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: '2rem', alignItems: 'center' }}>
          {LINKS.map(({ path, label }) => (
            <Link key={path} to={path} style={{
              color: active(path) ? 'var(--gold)' : 'var(--brown-pale)',
              fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none',
              borderBottom: active(path) ? '2px solid var(--gold)' : '2px solid transparent',
              paddingBottom: 2, transition: 'color 0.2s, border-color 0.2s'
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right: cart + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {total > 0 && (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowCart(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brown-pale)', padding: 6, position: 'relative' }}>
                <ShoppingBag size={22} />
                <span style={{ position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: '50%', background: 'var(--gold)', color: 'var(--brown-dark)', fontSize: '0.6rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{total}</span>
              </button>
              {showCart && (
                <div style={{ position: 'absolute', right: 0, top: 44, width: 200, background: 'var(--cream)', borderRadius: 10, boxShadow: '0 8px 32px rgba(44,26,6,.25)', padding: 10, border: '1px solid var(--brown-pale)' }}>
                  {cateringCount > 0 && (
                    <Link to="/catering" onClick={() => setShowCart(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: 8, textDecoration: 'none', color: 'var(--brown-dark)', fontWeight: 700, fontSize: '0.82rem' }}>
                      <span>Catering</span>
                      <span style={{ background: 'var(--gold)', color: 'var(--brown-dark)', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900 }}>{cateringCount}</span>
                    </Link>
                  )}
                  {rentalCount > 0 && (
                    <Link to="/rentals" onClick={() => setShowCart(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: 8, textDecoration: 'none', color: 'var(--brown-dark)', fontWeight: 700, fontSize: '0.82rem' }}>
                      <span>Rentals</span>
                      <span style={{ background: 'var(--gold)', color: 'var(--brown-dark)', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900 }}>{rentalCount}</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Order CTA */}
          <a href="https://wa.me/18159051230" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex"
            style={{ background: 'var(--gold)', color: 'var(--brown-dark)', padding: '8px 18px', borderRadius: 3, fontWeight: 900, fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Order Now
          </a>

          <button onClick={() => setOpen(v => !v)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brown-pale)', padding: 6 }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu , solid, always readable */}
      {open && (
        <div style={{ background: 'var(--brown-dark)', borderTop: '2px solid var(--gold-dark)', padding: '12px 1.5rem 20px' }}>
          {LINKS.map(({ path, label }) => (
            <Link key={path} to={path} style={{
              display: 'block', padding: '12px 16px', borderRadius: 6, marginBottom: 4,
              fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.06em',
              background: active(path) ? 'var(--gold)' : 'transparent',
              color: active(path) ? 'var(--brown-dark)' : 'var(--brown-pale)',
            }}>
              {label}
            </Link>
          ))}
          <a href="https://wa.me/18159051230" target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', marginTop: 12, padding: '14px 16px', borderRadius: 6, background: 'var(--gold)', color: 'var(--brown-dark)', fontWeight: 900, fontSize: '0.88rem', textAlign: 'center', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}