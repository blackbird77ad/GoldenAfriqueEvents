import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/contact';

const STEPS = [
  { key: 'food',     question: "What food are you looking for? Describe it and I will make sure we sort you out!",  placeholder: 'e.g. Konkonte with groundnut soup, Ampesi...' },
  { key: 'quantity', question: 'How many people are you serving? Or how many portions do you need?',               placeholder: 'e.g. 50 people, 100 portions...'              },
  { key: 'date',     question: 'What date do you need it for?',                                                    placeholder: 'e.g. 15 April 2025, next Saturday...'         },
  { key: 'price',    question: 'Do you have a budget in mind per plate or serving? (Optional)',                    placeholder: 'e.g. GHS 30 per plate, or not sure yet'        },
  { key: 'notes',    question: 'Any special requests or dietary needs? (Optional)',                                placeholder: 'e.g. no spice, halal, vegetarian...'           },
  { key: 'name',     question: "Almost done! What is your name?",                                                  placeholder: 'Your full name'                                },
  { key: 'phone',    question: 'And your WhatsApp number so we can reach you?',                                    placeholder: 'e.g. +233 XX XXX XXXX'                         },
];

const ChefSVG = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="75" rx="22" ry="18" fill="white" stroke="#e5e7eb" strokeWidth="1.5"/>
    <path d="M35 68 Q50 90 65 68" fill="#fbbf24" opacity="0.8"/>
    <rect x="44" y="65" width="12" height="20" rx="2" fill="#fbbf24"/>
    <rect x="45" y="52" width="10" height="10" rx="3" fill="#fcd9a0"/>
    <ellipse cx="50" cy="44" rx="18" ry="16" fill="#fcd9a0"/>
    <rect x="34" y="28" width="32" height="8" rx="3" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <ellipse cx="50" cy="22" rx="14" ry="10" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
    <circle cx="44" cy="44" r="2.5" fill="#1f2937"/>
    <circle cx="56" cy="44" r="2.5" fill="#1f2937"/>
    <circle cx="45" cy="43" r="0.8" fill="white"/>
    <circle cx="57" cy="43" r="0.8" fill="white"/>
    <path d="M44 50 Q50 56 56 50" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="50" cy="72" r="1.5" fill="white"/>
    <circle cx="50" cy="78" r="1.5" fill="white"/>
    <ellipse cx="28" cy="68" rx="6" ry="9" fill="white" stroke="#e5e7eb" strokeWidth="1" transform="rotate(-15 28 68)"/>
    <ellipse cx="72" cy="68" rx="6" ry="9" fill="white" stroke="#e5e7eb" strokeWidth="1" transform="rotate(15 72 68)"/>
    <circle cx="24" cy="76" r="5" fill="#fcd9a0"/>
    <circle cx="76" cy="76" r="5" fill="#fcd9a0"/>
  </svg>
);

function ChefChat({ onClose }) {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState({});
  const [input,   setInput]   = useState('');
  const [done,    setDone]    = useState(false);
  const [chat,    setChat]    = useState([
    { from: 'chef', text: "Hi there! I am Chef Golden. Don't see the food you're looking for? Tell me what you want and I'll sort it out!" }
  ]);

  const advance = (val) => {
    const value = val || input.trim() || 'Skip';
    setChat(c => [...c, { from: 'user', text: value }]);
    setAnswers(a => ({ ...a, [STEPS[step].key]: value }));
    setInput('');
    const next = step + 1;
    if (next < STEPS.length) {
      setTimeout(() => {
        setChat(c => [...c, { from: 'chef', text: STEPS[next].question }]);
        setStep(next);
      }, 400);
    } else {
      setTimeout(() => {
        setChat(c => [...c, { from: 'chef', text: "Perfect! Here is your order summary. Ready to send it to our kitchen?" }]);
        setDone(true);
      }, 400);
    }
  };

  const sendToWhatsApp = () => {
    const a = answers;
    const msg = encodeURIComponent(
      `Hello Golden Afrique Event!\n\nCustom Food Enquiry:\n\n` +
      `Food wanted:   ${a.food || '-'}\n` +
      `Quantity:      ${a.quantity || '-'}\n` +
      `Date needed:   ${a.date || '-'}\n` +
      `Budget:        ${a.price || 'Not specified'}\n` +
      `Special notes: ${a.notes || 'None'}\n\n` +
      `Name:          ${a.name || '-'}\n` +
      `WhatsApp:      ${a.phone || '-'}\n\n` +
      `Please confirm availability and pricing. Thank you!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const reset = () => {
    setStep(0); setAnswers({}); setInput(''); setDone(false);
    setChat([{ from: 'chef', text: "Hi there! I am Chef Golden. Don't see the food you're looking for? Tell me what you want and I'll sort it out!" }]);
  };

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 z-50 bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      style={{ maxHeight: '85vh' }}>

      <div className="bg-black p-4 flex items-center gap-3">
        <div className="w-12 h-12 shrink-0"><ChefSVG size={48} /></div>
        <div className="flex-1">
          <div className="text-white font-extrabold text-sm">Chef Golden</div>
          <div className="text-yellow-400 text-xs">Custom Food Orders</div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
          <X size={16} className="text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {chat.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
              ${msg.from === 'chef' ? 'bg-gray-100 text-gray-800 rounded-tl-sm' : 'bg-yellow-400 text-black font-bold rounded-tr-sm'}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}

        {done && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <div className="text-xs font-extrabold text-yellow-800 uppercase tracking-wide mb-2">Order Summary</div>
            {Object.entries(answers).map(([key, val]) => (
              <div key={key} className="flex justify-between text-xs py-1 border-b border-yellow-100">
                <span className="text-gray-500 capitalize">{key}</span>
                <span className="font-bold text-gray-800 text-right max-w-[60%]">{val}</span>
              </div>
            ))}
            <button onClick={sendToWhatsApp}
              className="w-full mt-4 py-3 rounded-2xl bg-green-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-all">
              <Send size={16} /> Send to Kitchen via WhatsApp
            </button>
            <button onClick={reset} className="w-full mt-2 py-2 rounded-2xl text-gray-400 font-bold text-xs hover:text-black transition-all">
              Start over
            </button>
          </motion.div>
        )}
      </div>

      {!done && (
        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-400 mb-2 font-bold">Step {step + 1} of {STEPS.length}</div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && advance()}
              placeholder={STEPS[step]?.placeholder}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-400 transition-all" />
            <button onClick={() => advance()}
              className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center hover:bg-yellow-300 transition-all shrink-0">
              <ChevronRight size={18} className="text-black" />
            </button>
          </div>
          {(step === 3 || step === 4) && (
            <button onClick={() => advance('Skip')} className="w-full mt-2 text-xs text-gray-400 hover:text-black transition-all">
              Skip this step
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function ChefCharacter({ variant = 'full' }) {
  const [open,      setOpen]      = useState(false);
  const [minimised, setMinimised] = useState(false);

  if (variant === 'small') {
    return (
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        onClick={() => window.location.href = '/catering'}>
        <ChefSVG size={70} />
        <motion.div
          className="mt-2 bg-yellow-400 text-black text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
          animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          See our menu
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-2">
            {!minimised && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-3 max-w-[180px] border border-yellow-200 relative">
                <div className="text-xs font-bold text-gray-800 leading-snug">
                  Don't see your food? Tell me what you want!
                </div>
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-yellow-200 rotate-45" />
                <button onClick={() => setMinimised(true)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                  <X size={10} className="text-gray-600" />
                </button>
              </motion.div>
            )}
            <motion.button
              onClick={() => { setOpen(true); setMinimised(false); }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
              <ChefSVG size={75} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <ChefChat onClose={() => setOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}