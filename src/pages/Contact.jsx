import { motion } from 'framer-motion';
import { MessageCircle, Phone, Instagram, MapPin, Clock } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE, instagramLink, INSTAGRAM } from '../data/contact';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true },
  transition: { duration: 0.6, delay },
});

const CONTACT_OPTIONS = [
  {
    icon:    <MessageCircle size={28} />,
    label:   'WhatsApp',
    sub:     'Fastest response — chat with us directly',
    value:   WHATSAPP_NUMBER,
    action:  `https://wa.me/${WHATSAPP_NUMBER}`,
    color:   'bg-green-500 hover:bg-green-600',
    cta:     'Chat on WhatsApp',
  },
  {
    icon:    <Phone size={28} />,
    label:   'Call Us',
    sub:     'Speak to us directly — Mon to Sat, 8am–8pm',
    value:   PHONE,
    action:  `tel:${PHONE}`,
    color:   'bg-black hover:bg-gray-800',
    cta:     'Call Now',
  },
  {
    icon:    <Instagram size={28} />,
    label:   'Instagram DM',
    sub:     'Send us a DM — we also post event photos',
    value:   INSTAGRAM,
    action:  instagramLink,
    color:   'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90',
    cta:     'DM on Instagram',
  },
];

const FAQS = [
  { q: 'How far in advance should I book?',       a: 'We recommend at least 2 weeks in advance for catering and 1 week for rentals. For large events, 4–6 weeks ahead is ideal.' },
  { q: 'Do you deliver and set up?',              a: 'Yes — we offer delivery and setup for rentals. Delivery fees depend on your location. Ask us when you inquire.' },
  { q: 'How do I get a price quote?',             a: 'Just send us a WhatsApp message or DM with what you need — we respond quickly with pricing and availability.' },
  { q: 'Can I see items before renting?',         a: 'Yes, you can visit us or we can send you photos of specific items. WhatsApp us to arrange.' },
  { q: 'What events do you cater for?',           a: 'Weddings, birthdays, baby showers, naming ceremonies, corporate events, funerals, graduations and more.' },
  { q: 'Do you offer package deals?',             a: 'Yes — we can put together custom packages combining catering and rentals at a special rate. Ask us!' },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Header */}
      <div className="bg-black text-white text-center py-20 px-4">
        <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">We'd Love to Hear From You</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Get In Touch</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Whether you're planning a small gathering or a grand event — reach out and let's make it happen together.
        </p>
      </div>

      {/* Contact cards */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-2">Reach us your way</h2>
            <p className="text-gray-500">We're available on multiple channels — choose what works best for you.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT_OPTIONS.map((opt, i) => (
              <motion.div key={opt.label} {...fadeUp(i * 0.1)}
                className="flex flex-col items-center text-center p-8 rounded-3xl border-2 border-gray-100 hover:border-yellow-400 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-black">
                  {opt.icon}
                </div>
                <h3 className="font-extrabold text-lg mb-1">{opt.label}</h3>
                <p className="text-gray-500 text-sm mb-2 leading-relaxed">{opt.sub}</p>
                <p className="text-gray-400 text-xs mb-6 font-bold">{opt.value}</p>
                <a href={opt.action} target="_blank" rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-2xl text-white font-extrabold text-sm text-center transition-all hover:-translate-y-0.5 ${opt.color}`}>
                  {opt.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick inquiry */}
      <section className="py-20 px-4 sm:px-6 bg-yellow-400">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">Just want a quick price?</h2>
            <p className="text-black/70 mb-8 leading-relaxed">
              Go to our <strong>Catering</strong> or <strong>Rentals</strong> page, select what you need,
              and hit send — your full selection goes straight to our WhatsApp in one message.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/catering"
                className="px-8 py-4 rounded-full bg-black text-white font-extrabold text-sm uppercase tracking-wider hover:bg-gray-900 transition-all hover:-translate-y-0.5">
                Browse Catering
              </a>
              <a href="/rentals"
                className="px-8 py-4 rounded-full border-2 border-black text-black font-extrabold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all hover:-translate-y-0.5">
                Browse Rentals
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info strip */}
      <section className="py-12 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div {...fadeUp()} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-black" />
            </div>
            <div>
              <div className="font-extrabold mb-1">Working Hours</div>
              <div className="text-gray-400 text-sm">Monday – Saturday: 8am – 8pm</div>
              <div className="text-gray-400 text-sm">Sunday: By appointment</div>
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-black" />
            </div>
            <div>
              <div className="font-extrabold mb-1">Location</div>
              <div className="text-gray-400 text-sm">Ghana — Available for events across all regions</div>
              <div className="text-gray-400 text-sm">Delivery & setup available</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-3">Common Questions</p>
            <h2 className="text-3xl font-extrabold">Frequently Asked</h2>
          </motion.div>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)}
                className="p-6 rounded-2xl border border-gray-100 hover:border-yellow-300 transition-all">
                <div className="font-extrabold text-base mb-2">{faq.q}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{faq.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}