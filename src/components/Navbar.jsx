import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { path: '/',         label: 'Home'      },
  { path: '/catering', label: 'Catering'  },
  { path: '/rentals',  label: 'Rentals'   },
  { path: '/gallery',  label: 'Gallery'   },
  { path: '/contact',  label: 'Contact'   },
];

export default function Navbar() {
  const [open,       setOpen]       = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [showCarts,  setShowCarts]  = useState(false);
  const location = useLocation();
  const { cateringCount, rentalCount } = useCart();
  const totalItems = cateringCount + rentalCount;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const isActive = path => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 shadow-lg backdrop-blur-sm' : 'bg-black/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
              <UtensilsCrossed size={18} className="text-black" />
            </div>
            <div>
              <div className="text-white font-extrabold text-base leading-none">Golden Afrique</div>
              <div className="text-yellow-400 text-xs tracking-widest uppercase">Events</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ path, label }) => (
              <Link key={path} to={path}
                className={`text-sm font-bold tracking-wide transition-colors relative ${isActive(path) ? 'text-yellow-400' : 'text-gray-300 hover:text-white'}`}>
                {label}
                {isActive(path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile menu */}
          <div className="flex items-center gap-3">
            {/* Cart badge */}
            {totalItems > 0 && (
              <div className="relative">
                <button onClick={() => setShowCarts(v => !v)}
                  className="relative p-2 text-gray-300 hover:text-white transition-colors">
                  <ShoppingBag size={22} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 text-black text-xs font-extrabold flex items-center justify-center">
                    {totalItems}
                  </span>
                </button>

                {/* Mini cart dropdown */}
                {showCarts && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-2xl p-3 text-sm">
                    {cateringCount > 0 && (
                      <Link to="/catering" onClick={() => setShowCarts(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-yellow-50 transition-colors">
                        <span className="font-bold text-gray-800">🍽️ Catering</span>
                        <span className="bg-yellow-400 text-black text-xs font-extrabold px-2 py-0.5 rounded-full">{cateringCount}</span>
                      </Link>
                    )}
                    {rentalCount > 0 && (
                      <Link to="/rentals" onClick={() => setShowCarts(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-yellow-50 transition-colors">
                        <span className="font-bold text-gray-800">🎪 Rentals</span>
                        <span className="bg-yellow-400 text-black text-xs font-extrabold px-2 py-0.5 rounded-full">{rentalCount}</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/98 border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ path, label }) => (
              <Link key={path} to={path}
                className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${isActive(path) ? 'bg-yellow-400 text-black' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}