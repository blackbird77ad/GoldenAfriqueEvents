import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/contact';

// SVG Coordinator Character
const CoordinatorSVG = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body - suit */}
    <ellipse cx="50" cy="76" rx="22" ry="18" fill="#1f2937"/>
    {/* Shirt */}
    <rect x="44" y="58" width="12" height="22" rx="1" fill="white"/>
    {/* Bow tie */}
    <path d="M44 62 L50 65 L56 62 L50 59 Z" fill="#fbbf24"/>
    {/* Jacket lapels */}
    <path d="M44 58 L38 75 L50 70 Z" fill="#1f2937"/>
    <path d="M56 58 L62 75 L50 70 Z" fill="#1f2937"/>
    {/* Neck */}
    <rect x="45" y="50" width="10" height="10" rx="3" fill="#fcd9a0"/>
    {/* Head */}
    <ellipse cx="50" cy="42" rx="17" ry="15" fill="#fcd9a0"/>
    {/* Hair */}
    <path d="M33 38 Q36 25 50 24 Q64 25 67 38" fill="#92400e"/>
    {/* Eyes */}
    <circle cx="44" cy="42" r="2.5" fill="#1f2937"/>
    <circle cx="56" cy="42" r="2.5" fill="#1f2937"/>
    <circle cx="45" cy="41" r="0.8" fill="white"/>
    <circle cx="57" cy="41" r="0.8" fill="white"/>
    {/* Smile */}
    <path d="M44 48 Q50 54 56 48" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Arms */}
    <ellipse cx="28" cy="70" rx="5" ry="10" fill="#1f2937" transform="rotate(-10 28 70)"/>
    <ellipse cx="72" cy="70" rx="5" ry="10" fill="#1f2937" transform="rotate(10 72 70)"/>
    {/* Hands */}
    <circle cx="25" cy="79" r="5" fill="#fcd9a0"/>
    {/* Clipboard */}
    <rect x="68" y="60" width="14" height="18" rx="2" fill="#f5f5f5" stroke="#d1d5db" strokeWidth="1"/>
    <rect x="72" y="58" width="6" height="4" rx="1" fill="#9ca3af"/>
    <line x1="70" y1="67" x2="80" y2="67" stroke="#d1d5db" strokeWidth="1"/>
    <line x1="70" y1="71" x2="78" y2="71" stroke="#d1d5db" strokeWidth="1"/>
    <line x1="70" y1="75" x2="76" y2="75" stroke="#d1d5db" strokeWidth="1"/>
    {/* Ribbon/decoration */}
    <path d="M50 86 Q45 92 42 90 Q45 88 50 86 Q55 88 58 90 Q55 92 50 86Z" fill="#fbbf24"/>
  </svg>
);

// Party planner steps
const PARTY_STEPS = [
  { key: 'event',    question: "How exciting! 🎉 What are you celebrating?",                      type: 'chips',   options: ['Wedding', 'Birthday', 'Baby Shower', 'Corporate Event', 'Naming Ceremony', 'Graduation', 'Funeral', 'Other'] },
  { key: 'guests',   question: "Wonderful! How many guests are you expecting?",                   type: 'input',   placeholder: 'e.g. 100 guests, about 50 people...' },
  { key: 'date',     question: "What date is your event?",                                        type: 'input',   placeholder: 'e.g. 20 June 2025, next month...' },
  { key: 'needs',    question: "What do you need from us?",                                       type: 'chips',   options: ['Food / Catering', 'Rentals / Equipment', 'Both Food & Rentals', 'Full Setup'] },
  { key: 'details',  question: "Any specific dishes, items or ideas in mind? (Optional)",        type: 'input',   placeholder: 'e.g. Jollof rice, crystal chairs, gold backdrop...' },
  { key: 'budget',   question: "Do you have a rough budget in mind? (Optional, skip if unsure)", type: 'input',   placeholder: 'e.g. GHS 5000, not sure yet...' },
  { key: 'name',     question: "Almost there! What's your name?",                                 type: 'input',   placeholder: 'Your full name' },
  { key: 'phone',    question: "And your WhatsApp number so we can reach you?",                   type: 'input',   placeholder: 'e.g. +233 XX XXX XXXX' },
];

// Short rental enquiry steps
const RENTAL_STEPS = [
  { key: 'item',     question: "Hi! 📋 What item or equipment are you looking for?",              type: 'input',   placeholder: 'e.g. Throne chairs, large tent, dance floor...' },
  { key: 'quantity', question: "How many do you need?",                                           type: 'input',   placeholder: 'e.g. 50 chairs, 2 tents...' },
  { key: 'date',     question: "What date do you need them for?",                                 type: 'input',   placeholder: 'e.g. 10 May 2025...' },
  { key: 'name',     question: "Your name please?",                                               type: 'input',   placeholder: 'Your full name' },
  { key: 'phone',    question: "And your WhatsApp number?",                                       type: 'input',   placeholder: 'e.g. +233 XX XXX XXXX' },
];

const buildPartyMessage = a =>
  `Hello Golden Afrique Event! 🎉\n\nParty Planning Enquiry:\n\n` +
  `Event type:   ${a.event || '-'}\n` +
  `Guest count:  ${a.guests || '-'}\n` +
  `Event date:   ${a.date || '-'}\n` +
  `Needs:        ${a.needs || '-'}\n` +
  `Details:      ${a.details || 'Not specified'}\n` +
  `Budget:       ${a.budget || 'Not specified'}\n\n` +
  `Name:         ${a.name || '-'}\n` +
  `WhatsApp:     ${a.phone || '-'}\n\n` +
  `Please reach out to discuss our event. Thank you!`;

const buildRentalMessage = a =>
  `Hello Golden Afrique Event! 📋\n\nRental Enquiry (Item Not Listed):\n\n` +
  `Item wanted:  ${a.item || '-'}\n` +
  `Quantity:     ${a.quantity || '-'}\n` +
  `Date needed:  ${a.date || '-'}\n\n` +
  `Name:         ${a.name || '-'}\n` +
  `WhatsApp:     ${a.phone || '-'}\n\n` +
  `Please confirm availability and pricing. Thank you!`;

function ChatFlow({ steps, onSend, headerTitle, headerSub, bubbleText, introText }) {
  const [open,    setOpen]    = useState(false);
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState({});
  const [input,   setInput]   = useState('');
  const [chat,    setChat]    = useState([{ from: 'coord', text: introText }]);
  const [done,    setDone]    = useState(false);
  const [minimised, setMinimised] = useState(false);

  const handleChip = val => {
    setChat(c => [...c, { from: 'user', text: val }]);
    setAnswers(a => ({ ...a, [steps[step].key]: val }));
    const next = step + 1;
    if (next < steps.length) {
      setTimeout(() => { setChat(c => [...c, { from: 'coord', text: steps[next].question }]); setStep(next); }, 400);
    } else {
      setTimeout(() => { setChat(c => [...c, { from: 'coord', text: "Perfect! Here's your summary. Ready to send? 🎉" }]); setDone(true); }, 400);
    }
  };

  const handleSend = () => {
    const val = input.trim() || 'Skip';
    setChat(c => [...c, { from: 'user', text: val }]);
    setAnswers(a => ({ ...a, [steps[step].key]: val }));
    setInput('');
    const next = step + 1;
    if (next < steps.length) {
      setTimeout(() => { setChat(c => [...c, { from: 'coord', text: steps[next].question }]); setStep(next); }, 400);
    } else {
      setTimeout(() => { setChat(c => [...c, { from: 'coord', text: "Perfect! Here's your summary. Ready to send? 🎉" }]); setDone(true); }, 400);
    }
  };

  const send = () => {
    const msg = encodeURIComponent(onSend(answers));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const reset = () => {
    setStep(0); setAnswers({}); setInput(''); setDone(false);
    setChat([{ from: 'coord', text: introText }]);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            className="flex flex-col items-end gap-2">
            {!minimised && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-3 max-w-[190px] border border-yellow-200 relative">
                <div className="text-xs font-bold text-gray-800 leading-snug">{bubbleText}</div>
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-yellow-200 rotate-45" />
                <button onClick={() => setMinimised(true)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-all">
                  <X size={10} className="text-gray-600" />
                </button>
              </motion.div>
            )}
            <motion.button onClick={() => { setOpen(true); setMinimised(false); }}
              animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="relative">
              <CoordinatorSVG size={75} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 border-2 border-white animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 z-50 bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              style={{ maxHeight: '85vh' }}>

              <div className="bg-black p-4 flex items-center gap-3">
                <div className="w-12 h-12 shrink-0"><CoordinatorSVG size={48} /></div>
                <div className="flex-1">
                  <div className="text-white font-extrabold text-sm">{headerTitle}</div>
                  <div className="text-yellow-400 text-xs">{headerSub}</div>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                  <X size={16} className="text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {chat.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                      ${msg.from === 'coord' ? 'bg-gray-100 text-gray-800 rounded-tl-sm' : 'bg-yellow-400 text-black font-bold rounded-tr-sm'}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Chip options */}
                {!done && steps[step]?.type === 'chips' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2">
                    {steps[step].options.map(opt => (
                      <button key={opt} onClick={() => handleChip(opt)}
                        className="px-3 py-2 rounded-full border-2 border-gray-200 text-xs font-bold hover:border-yellow-400 hover:bg-yellow-50 transition-all">
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}

                {done && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                    <div className="text-xs font-extrabold text-yellow-800 uppercase tracking-wide mb-2">Summary</div>
                    {Object.entries(answers).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-xs py-1 border-b border-yellow-100">
                        <span className="text-gray-500 capitalize">{key}</span>
                        <span className="font-bold text-gray-800 text-right max-w-[60%]">{val}</span>
                      </div>
                    ))}
                    <button onClick={send}
                      className="w-full mt-4 py-3 rounded-2xl bg-green-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-all">
                      <Send size={16} /> Send via WhatsApp
                    </button>
                    <button onClick={reset}
                      className="w-full mt-2 py-2 rounded-2xl text-gray-400 font-bold text-xs hover:text-black transition-all">
                      Start over
                    </button>
                  </motion.div>
                )}
              </div>

              {!done && steps[step]?.type === 'input' && (
                <div className="p-4 border-t border-gray-100">
                  <div className="text-xs text-gray-400 mb-2 font-bold">Step {step + 1} of {steps.length}</div>
                  <div className="flex gap-2">
                    <input value={input} onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder={steps[step]?.placeholder}
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-yellow-400 transition-all" />
                    <button onClick={handleSend}
                      className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center hover:bg-yellow-300 transition-all shrink-0">
                      <ChevronRight size={18} className="text-black" />
                    </button>
                  </div>
                  {(step === 4 || step === 5) && steps.length > 6 && (
                    <button onClick={() => { setInput(''); handleSend(); }}
                      className="w-full mt-2 text-xs text-gray-400 hover:text-black transition-all">
                      Skip this step →
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Party Planner, for Home + Catering pages
export function PartyPlanner({ variant = 'full' }) {
  if (variant === 'small') {
    return (
      <motion.div className="flex flex-col items-center cursor-pointer"
        animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        onClick={() => document.getElementById('party-planner-trigger')?.click()}>
        <CoordinatorSVG size={70} />
        <motion.div className="mt-2 bg-black text-yellow-400 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
          animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          🎉 Planning an event?
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <ChatFlow
        steps={PARTY_STEPS}
        onSend={buildPartyMessage}
        headerTitle="Event Planner"
        headerSub="Let's plan your perfect event"
        bubbleText="Planning a party or event? Let's roll it out together! 🎉"
        introText="Hi! 🎉 I'm your event planner. Tell me about your occasion and let's make it unforgettable together!"
      />
    </div>
  );
}

// Rental Coordinator, for Rentals page
export function RentalCoordinator() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <ChatFlow
        steps={RENTAL_STEPS}
        onSend={buildRentalMessage}
        headerTitle="Hiring Coordinator"
        headerSub="Can't find what you need?"
        bubbleText="Can't find what you're looking for? Tell me and I'll check for you! 📋"
        introText="Hi! 📋 I'm your hiring coordinator. Can't find the item you need in our catalogue? Tell me what you're looking for!"
      />
    </div>
  );
}