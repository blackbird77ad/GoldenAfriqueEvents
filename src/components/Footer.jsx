import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Instagram, UtensilsCrossed } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE, instagramLink, INSTAGRAM } from '../data/contact';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
                <UtensilsCrossed size={18} className="text-black" />
              </div>
              <div>
                <div className="font-extrabold text-base leading-none">Golden Afrique Event</div>
                <div className="text-yellow-400 text-xs tracking-widest uppercase">Catering & Rentals</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing African elegance to every occasion. From catering to full event décor and equipment hire — we make your event unforgettable.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="font-extrabold text-sm uppercase tracking-widest text-yellow-400 mb-4">Quick Links</div>
            <div className="flex flex-col gap-2">
              {[
                { path: '/',         label: 'Home'     },
                { path: '/catering', label: 'Catering' },
                { path: '/rentals',  label: 'Rentals'  },
                { path: '/gallery',  label: 'Gallery'  },
                { path: '/contact',  label: 'Contact'  },
              ].map(({ path, label }) => (
                <Link key={path} to={path} className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-extrabold text-sm uppercase tracking-widest text-yellow-400 mb-4">Get In Touch</div>
            <div className="flex flex-col gap-3">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm">
                <MessageCircle size={16} className="shrink-0" /> WhatsApp Us
              </a>
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                <Phone size={16} className="shrink-0" /> {PHONE}
              </a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors text-sm">
                <Instagram size={16} className="shrink-0" /> {INSTAGRAM}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">© {year} Golden Afrique Event. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built by <a href="https://thebrandhelper.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-300 transition-colors">The BrandHelper</a></p>
        </div>
      </div>
    </footer>
  );
}