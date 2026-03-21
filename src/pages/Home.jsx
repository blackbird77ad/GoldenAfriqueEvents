import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, MessageCircle, Instagram } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE, instagramLink, INSTAGRAM } from '../data/contact';
import ChefCharacter from '../components/ChefCharacter';
import { PartyPlanner } from '../components/CoordinatorCharacter';

const SERVICES = [
  { icon: '🍽️', title: 'African Catering',   desc: 'Authentic Ghanaian dishes for any occasion — Jollof, banku, fufu, waakye and much more. Catering for individuals, parties and large events.', link: '/catering', cta: 'Order Food'      },
  { icon: '🎪', title: 'Event Rentals',       desc: 'Full décor and equipment hire — chairs, tables, backdrops, charger plates, food warmers, tents and over 80 items to transform your venue.',   link: '/rentals',  cta: 'Browse Rentals' },
  { icon: '✨', title: 'Full Event Setup',    desc: 'We handle everything from décor and food to equipment setup so you can enjoy your special day without any stress.',                             link: '/contact',  cta: 'Get In Touch'   },
];

const EVENTS = ['Weddings', 'Birthday Parties', 'Baby Showers', 'Corporate Events', 'Funerals', 'Naming Ceremonies', 'Graduations', 'Family Gatherings'];

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Home() {
  return (
    <div className="bg-white text-black">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/Events-decor/stage-setup-candles-chairs-backdrop.jpg" alt="Golden Afrique Event" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Catering · Décor · Event Rentals</p>
            <h1 className="text-white font-extrabold leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
              Golden Afrique<br /><span className="text-yellow-400">Event</span>
            </h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              African catering, stunning décor & full event equipment hire. We bring elegance and flavour to every occasion.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/catering" className="px-8 py-4 rounded-full bg-yellow-400 text-black font-extrabold text-sm uppercase tracking-wider hover:bg-yellow-300 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                Order Food <ChevronRight size={16} />
              </Link>
              <Link to="/rentals" className="px-8 py-4 rounded-full border-2 border-white text-white font-extrabold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all hover:-translate-y-0.5 flex items-center gap-2">
                Browse Rentals <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-0.5 h-8 bg-white/30 animate-pulse" />
          <div className="w-0.5 h-4 bg-yellow-400/60" />
        </div>
      </section>

      {/* CHARACTERS SECTION */}
      <section className="py-16 px-4 sm:px-6 bg-yellow-50 border-y border-yellow-100">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-yellow-600 text-xs font-bold uppercase tracking-widest mb-2">We're here to help</p>
          <h2 className="text-2xl md:text-3xl font-extrabold">Need something? Just ask!</h2>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* Chef */}
          <motion.div {...fadeUp(0)} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-yellow-100 hover:shadow-lg transition-all">
            <ChefCharacter variant="small" />
            <h3 className="font-extrabold text-lg mt-4 mb-2">Hungry? See our menu</h3>
            <p className="text-gray-500 text-sm mb-4">Browse our full African catering menu and place your order easily.</p>
            <Link to="/catering" className="px-6 py-3 rounded-full bg-yellow-400 text-black font-extrabold text-sm hover:bg-yellow-300 transition-all">
              View Catering Menu →
            </Link>
          </motion.div>

          {/* Coordinator */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-yellow-100 hover:shadow-lg transition-all">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
              <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="76" rx="22" ry="18" fill="#1f2937"/>
                <rect x="44" y="58" width="12" height="22" rx="1" fill="white"/>
                <path d="M44 62 L50 65 L56 62 L50 59 Z" fill="#fbbf24"/>
                <path d="M44 58 L38 75 L50 70 Z" fill="#1f2937"/>
                <path d="M56 58 L62 75 L50 70 Z" fill="#1f2937"/>
                <rect x="45" y="50" width="10" height="10" rx="3" fill="#fcd9a0"/>
                <ellipse cx="50" cy="42" rx="17" ry="15" fill="#fcd9a0"/>
                <path d="M33 38 Q36 25 50 24 Q64 25 67 38" fill="#92400e"/>
                <circle cx="44" cy="42" r="2.5" fill="#1f2937"/>
                <circle cx="56" cy="42" r="2.5" fill="#1f2937"/>
                <circle cx="45" cy="41" r="0.8" fill="white"/>
                <circle cx="57" cy="41" r="0.8" fill="white"/>
                <path d="M44 48 Q50 54 56 48" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <ellipse cx="28" cy="70" rx="5" ry="10" fill="#1f2937" transform="rotate(-10 28 70)"/>
                <ellipse cx="72" cy="70" rx="5" ry="10" fill="#1f2937" transform="rotate(10 72 70)"/>
                <circle cx="25" cy="79" r="5" fill="#fcd9a0"/>
                <rect x="68" y="60" width="14" height="18" rx="2" fill="#f5f5f5" stroke="#d1d5db" strokeWidth="1"/>
                <rect x="72" y="58" width="6" height="4" rx="1" fill="#9ca3af"/>
                <path d="M50 86 Q45 92 42 90 Q45 88 50 86 Q55 88 58 90 Q55 92 50 86Z" fill="#fbbf24"/>
              </svg>
            </motion.div>
            <h3 className="font-extrabold text-lg mt-4 mb-2">Planning an event?</h3>
            <p className="text-gray-500 text-sm mb-4">Tell us about your occasion and let's roll out the perfect setup together.</p>
            <button id="party-planner-home"
              onClick={() => document.getElementById('party-planner-trigger')?.click()}
              className="px-6 py-3 rounded-full bg-black text-yellow-400 font-extrabold text-sm hover:bg-gray-800 transition-all">
              Let's Plan Together →
            </button>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">Everything for your event</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} {...fadeUp(i * 0.1)}
                className="group p-8 rounded-3xl border-2 border-gray-100 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-5">{s.icon}</div>
                <h3 className="text-xl font-extrabold mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <Link to={s.link} className="inline-flex items-center gap-2 text-sm font-extrabold text-yellow-600 group-hover:text-yellow-500 transition-colors">
                  {s.cta} <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="py-24 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">Perfect For</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">Every Occasion</h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex flex-wrap justify-center gap-3">
            {EVENTS.map(e => (
              <span key={e} className="px-5 py-2.5 rounded-full border border-yellow-400/40 text-yellow-300 text-sm font-bold hover:bg-yellow-400 hover:text-black transition-all cursor-default">
                {e}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-3">Our Work</p>
            <h2 className="text-4xl md:text-5xl font-extrabold">Past Events</h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              '/Events-decor/stage-setup-candles-chairs-backdrop.jpg',
              '/Events-decor/serpentine-throne-table-chairs.jpg',
              '/Events-decor/golden-centerpiece.jpg',
              '/Events-decor/backdrop-gold.png',
              '/Events-decor/charger-setup.png',
              '/Events-decor/high-chairs-bridal.jpg',
              '/Events-decor/double-layer-stage-setup.jpg',
              '/catering-services/party-serving-banku-pepper-tilapia.png',
            ].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl">
                <img src={src} alt={`Event ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="text-center mt-8">
            <Link to="/gallery" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-extrabold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all hover:-translate-y-0.5">
              View Full Gallery <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 bg-yellow-400">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4">Ready to plan your event?</h2>
            <p className="text-black/70 text-lg mb-10">Reach out to us on WhatsApp, call or DM us on Instagram — we respond quickly!</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-extrabold text-sm uppercase tracking-wider hover:bg-gray-900 transition-all hover:-translate-y-0.5">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
              <a href={`tel:${PHONE}`}
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-black text-black font-extrabold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all hover:-translate-y-0.5">
                <Phone size={18} /> Call Us
              </a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-black text-black font-extrabold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all hover:-translate-y-0.5">
                <Instagram size={18} /> Instagram DM
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Party Planner floating — Home page */}
      <PartyPlanner />
    </div>
  );
}