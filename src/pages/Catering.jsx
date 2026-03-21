import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, X, MessageCircle, Phone, Instagram } from 'lucide-react';
import { CATERING_MENU } from '../data/catering';
import { useCart } from '../context/CartContext';
import { buildCateringMessage, whatsappLink, instagramLink, PHONE, WHATSAPP_NUMBER } from '../data/contact';
import ChefCharacter from '../components/ChefCharacter';
import { PartyPlanner } from '../components/CoordinatorCharacter';

const CATEGORIES = ['All', ...CATERING_MENU.map(c => c.category)];

export default function Catering() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartOpen,       setCartOpen]       = useState(false);
  const { cateringCart, addToCart, removeFromCart, updateQty, cateringCount } = useCart();

  const allItems = CATERING_MENU.flatMap(c => c.items.map(i => ({ ...i, category: c.category })));
  const filtered = activeCategory === 'All' ? allItems : allItems.filter(i => i.category === activeCategory);
  const inCart   = id => cateringCart.find(i => i.id === id);

  const sendOrder = () => {
    const msg = buildCateringMessage(cateringCart);
    window.open(whatsappLink(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden bg-black text-white text-center">
        <div className="absolute inset-0 opacity-20">
          <img src="/catering-services/party-serving-banku-pepper-tilapia.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10">
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">African Flavours</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Our Catering Menu</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Catering for individuals, parties, organisations and all events. Select dishes and send your order via WhatsApp, call or Instagram DM.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-yellow-50 border-b border-yellow-100 py-5 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-yellow-900">
          <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-extrabold text-xs flex items-center justify-center">1</span> Browse & select your dishes</div>
          <div className="hidden sm:block text-yellow-300">→</div>
          <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-extrabold text-xs flex items-center justify-center">2</span> Review your order in the cart</div>
          <div className="hidden sm:block text-yellow-300">→</div>
          <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-extrabold text-xs flex items-center justify-center">3</span> Send to our kitchen via WhatsApp</div>
        </div>
      </div>

      {/* Don't see your food banner */}
      <div className="bg-black py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white text-sm font-bold text-center sm:text-left">
            🍲 Don't see the food you're looking for? Our menu is not exhaustive - we cook much more!
          </p>
          <p className="text-yellow-400 text-xs font-extrabold animate-pulse">
            👨‍🍳 Chat with our chef below ↓
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 hide-scroll">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-all ${activeCategory === cat ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-black'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const cartItem = inCart(item.id);
              return (
                <motion.div key={item.id} layout
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-extrabold px-2 py-0.5 rounded-full">{item.id}</span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-extrabold text-sm leading-tight mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2">{item.desc}</p>
                    <p className="text-xs text-yellow-600 font-bold mb-3">Contact for pricing</p>
                    {cartItem ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, cartItem.qty - 1, 'catering')}
                          className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                          <Minus size={12} />
                        </button>
                        <span className="font-extrabold text-sm flex-1 text-center">{cartItem.qty}</span>
                        <button onClick={() => updateQty(item.id, cartItem.qty + 1, 'catering')}
                          className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item, 'catering')}
                        className="w-full py-2 rounded-xl bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wide hover:bg-yellow-300 transition-all">
                        + Select
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating cart */}
      <AnimatePresence>
        {cateringCount > 0 && (
          <motion.button
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-6 py-4 rounded-full bg-black text-white font-extrabold text-sm shadow-2xl hover:-translate-y-1 transition-all">
            <ShoppingBag size={20} />
            <span>{cateringCount} selected</span>
            <span className="bg-yellow-400 text-black text-xs font-extrabold px-2 py-0.5 rounded-full">View</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <div>
                  <div className="font-extrabold text-lg">Your Catering Order</div>
                  <div className="text-xs text-gray-400">{cateringCount} item{cateringCount !== 1 ? 's' : ''} selected</div>
                </div>
                <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-black transition-all">
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                {cateringCart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-yellow-600 font-bold">{item.id}</div>
                      <div className="font-extrabold text-sm">{item.name}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQty(item.id, item.qty - 1, 'catering')} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-all"><Minus size={10} /></button>
                        <span className="font-extrabold text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1, 'catering')} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-all"><Plus size={10} /></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, 'catering')} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <div className="p-5 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-500 mb-4 text-center leading-relaxed">We'll confirm availability, pricing and delivery after receiving your order.</p>
                <div className="flex flex-col gap-2">
                  <button onClick={sendOrder} className="w-full py-3.5 rounded-2xl bg-green-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-all">
                    <MessageCircle size={18} /> Send Order to Kitchen (WhatsApp)
                  </button>
                  <a href={instagramLink} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                    <Instagram size={18} /> Send via Instagram DM
                  </a>
                  <a href={`tel:${PHONE}`} className="w-full py-3.5 rounded-2xl bg-black text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                    <Phone size={18} /> Call to Order
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Chef character — bottom right */}
      <ChefCharacter variant="full" />

      {/* Party planner — will sit above chef, offset */}
      <div className="fixed bottom-24 right-28 z-30">
        <PartyPlanner />
      </div>
    </div>
  );
}