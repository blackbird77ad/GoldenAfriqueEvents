import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, MessageCircle, Instagram, Star } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE, instagramLink, INSTAGRAM } from '../data/contact';

const SERVICES = [
  {
    icon:  '🍽️',
    title: 'African Catering',
    desc:  'Authentic Ghanaian dishes for any occasion — from intimate gatherings to large events. Jollof, banku, fufu, waakye and much more.',
    link:  '/catering',
    cta:   'Order Food',
  },
  {
    icon:  '🎪',
    title: 'Event Rentals',
    desc:  'Full décor and equipment hire — chairs, tables, backdrops, charger plates, food warmers, tents and over 80 items to transform your venue.',
    link:  '/rentals',
    cta:   'Browse Rentals',
  },
  {
    icon:  '✨',
    title: 'Full Event Setup',
    desc:  'We handle everything from décor and food to equipment setup so you can enjoy your special day without any stress.',
    link:  '/contact',
    cta:   'Get In Touch',
  },
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

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/Events-decor/stage-setup-candles-chairs-backdrop.jpg" alt="Golden Afrique Events" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Ghana's Premier Event Partner</p>
            <h1 className="text-white font-extrabold leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
              Golden Afrique<br /><span className="text-yellow-400">Events</span>
            </h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              African catering, stunning décor & full event equipment hire. We bring elegance and flavour to every occasion.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/catering"
                className="px-8 py-4 rounded-full bg-yellow-400 text-black font-extrabold text-sm uppercase tracking-wider hover:bg-yellow-300 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                Order Food <ChevronRight size={16} />
              </Link>
              <Link to="/rentals"
                className="px-8 py-4 rounded-full border-2 border-white text-white font-extrabold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all hover:-translate-y-0.5 flex items-center gap-2">
                Browse Rentals <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-0.5 h-8 bg-white/30 animate-pulse" />
          <div className="w-0.5 h-4 bg-yellow-400/60" />
        </div>
      </section>

      {/* ── SERVICES ── */}
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
                <Link to={s.link}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-yellow-600 group-hover:text-yellow-500 transition-colors">
                  {s.cta} <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS WE CATER FOR ── */}
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

      {/* ── GALLERY TEASER ── */}
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
            <Link to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-extrabold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all hover:-translate-y-0.5">
              View Full Gallery <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
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
    </div>
  );
}