import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, X, MessageCircle, Phone, Instagram, Info } from 'lucide-react';
import { RENTALS } from '../data/rentals';
import { useCart } from '../context/CartContext';
import { buildRentalMessage, whatsappLink, instagramLink, PHONE, WHATSAPP_NUMBER } from '../data/contact';

const CATEGORIES = ['All', ...RENTALS.map(c => c.category)];

export default function Rentals() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartOpen,       setCartOpen]       = useState(false);
  const [searchTerm,     setSearchTerm]     = useState('');
  const { rentalCart, addToCart, removeFromCart, updateQty, rentalCount } = useCart();

  const allItems = RENTALS.flatMap(c => c.items.map(i => ({ ...i, category: c.category })));
  const filtered = allItems.filter(i => {
    const matchCat  = activeCategory === 'All' || i.category === activeCategory;
    const matchSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const inCart = id => rentalCart.find(i => i.id === id);

  const sendInquiry = () => {
    const msg = buildRentalMessage(rentalCart);
    window.open(whatsappLink(msg), '_blank');
  };

  const sendIG = () => window.open(instagramLink, '_blank');

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden bg-black text-white text-center">
        <div className="absolute inset-0 opacity-20">
          <img src="/Events-decor/serpentine-throne-table-chairs.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10">
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">Event Equipment</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Rentals Catalogue</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Over 80 items available for hire. Select what you need, note the ID, and send us your enquiry — it's that easy.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-yellow-50 border-b border-yellow-100 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-yellow-900">
            <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-extrabold text-xs flex items-center justify-center">1</span> Browse items & note the ID (e.g. R001)</div>
            <div className="hidden sm:block text-yellow-300">→</div>
            <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-extrabold text-xs flex items-center justify-center">2</span> Select items & quantities</div>
            <div className="hidden sm:block text-yellow-300">→</div>
            <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-yellow-400 text-black font-extrabold text-xs flex items-center justify-center">3</span> Send enquiry — we confirm & finalise</div>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-blue-50 border-b border-blue-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-blue-700">
          <Info size={14} className="shrink-0" />
          <span><strong>Tip:</strong> You can also just note the item ID (shown on each card) and call or message us directly — no need to use the cart.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by name or ID (e.g. R001)..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-black transition-all" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.slice(0, 6).map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-all ${activeCategory === cat ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-black'}`}>
                {cat === 'All' ? cat : cat.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Category pills full */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${activeCategory === cat ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-500 hover:border-black'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-6">{filtered.length} item{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const cartItem = inCart(item.id);
              return (
                <motion.div key={item.id} layout
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.2) }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img src={item.image} alt={item.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.style.background = '#f5f5f5'; }} />
                    {/* ID badge */}
                    <span className="absolute top-2 left-2 bg-black/80 text-yellow-400 text-xs font-extrabold px-2 py-0.5 rounded-full">
                      {item.id}
                    </span>
                    {cartItem && (
                      <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-extrabold px-2 py-0.5 rounded-full">
                        x{cartItem.qty}
                      </span>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="text-xs text-gray-400 font-bold mb-0.5">{item.category}</div>
                    <h3 className="font-extrabold text-xs leading-tight mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">{item.desc}</p>
                    <p className="text-xs text-yellow-600 font-bold mb-2">Price on request</p>

                    {cartItem ? (
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, cartItem.qty - 1, 'rental')}
                          className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                          <Minus size={11} />
                        </button>
                        <span className="font-extrabold text-sm flex-1 text-center">{cartItem.qty}</span>
                        <button onClick={() => updateQty(item.id, cartItem.qty + 1, 'rental')}
                          className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                          <Plus size={11} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item, 'rental')}
                        className="w-full py-2 rounded-xl bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wide hover:bg-yellow-300 transition-all">
                        + Inquire
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
        {rentalCount > 0 && (
          <motion.button
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-6 py-4 rounded-full bg-black text-white font-extrabold text-sm shadow-2xl hover:-translate-y-1 transition-all">
            <ShoppingBag size={20} />
            <span>{rentalCount} item{rentalCount !== 1 ? 's' : ''}</span>
            <span className="bg-yellow-400 text-black text-xs font-extrabold px-2 py-0.5 rounded-full">Inquire</span>
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
                  <div className="font-extrabold text-lg">Your Rental Enquiry</div>
                  <div className="text-xs text-gray-400">{rentalCount} item{rentalCount !== 1 ? 's' : ''} selected</div>
                </div>
                <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full border-2 border-gray-100 flex items-center justify-center hover:border-black transition-all">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                {rentalCart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shrink-0 bg-gray-100"
                      onError={e => { e.target.style.display = 'none'; }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-yellow-600 font-bold">{item.id}</div>
                      <div className="font-extrabold text-sm leading-tight">{item.name}</div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQty(item.id, item.qty - 1, 'rental')}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-all">
                          <Minus size={10} />
                        </button>
                        <span className="font-extrabold text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1, 'rental')}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-all">
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, 'rental')} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-500 mb-4 text-center leading-relaxed">
                  Send your selection to us. We'll confirm availability, pricing, delivery and setup.
                </p>
                <div className="flex flex-col gap-2">
                  <button onClick={sendInquiry}
                    className="w-full py-3.5 rounded-2xl bg-green-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-all">
                    <MessageCircle size={18} /> Send Enquiry via WhatsApp
                  </button>
                  <button onClick={sendIG}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                    <Instagram size={18} /> Send via Instagram DM
                  </button>
                  <a href={`tel:${PHONE}`}
                    className="w-full py-3.5 rounded-2xl bg-black text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all">
                    <Phone size={18} /> Call Us
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}