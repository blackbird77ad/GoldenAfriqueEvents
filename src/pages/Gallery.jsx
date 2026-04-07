import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ALL_IMAGES = [
  // Events & Decor
  { src: '/Events-decor/stage-setup-candles-chairs-backdrop.jpg',      caption: 'Full Stage Setup with Backdrop',         tags: ['events', 'parties'] },
  { src: '/Events-decor/double-layer-stage-setup.jpg',                  caption: 'Double Layer Event Stage',               tags: ['events', 'parties'] },
  { src: '/Events-decor/serpentine-throne-table-chairs.jpg',            caption: 'Serpentine Throne Table & Chairs',       tags: ['events', 'decor']   },
  { src: '/Events-decor/golden-centerpiece.jpg',                        caption: 'Golden Table Centrepiece',               tags: ['events', 'decor']   },
  { src: '/Events-decor/backdrop-gold.png',                             caption: 'Gold Sequin Backdrop',                   tags: ['events', 'decor']   },
  { src: '/Events-decor/charger-setup.png',                             caption: 'Charger Plate Table Setup',              tags: ['events', 'decor']   },
  { src: '/Events-decor/high-chairs-bridal.jpg',                        caption: 'Bridal High Chairs',                     tags: ['events', 'decor']   },
  { src: '/Events-decor/candelabra-centerpeice.jpg',                    caption: 'Candelabra Centrepiece',                 tags: ['events', 'decor']   },
  { src: '/Events-decor/white-floral-wedding-arch.jpg',                 caption: 'White Floral Wedding Arch',              tags: ['events', 'decor']   },
  { src: '/Events-decor/peach-floral-arch.jpg',                         caption: 'Peach Floral Arch',                      tags: ['events', 'decor']   },
  { src: '/Events-decor/green-floral-arch.jpg',                         caption: 'Green Floral Arch',                      tags: ['events', 'decor']   },
  { src: '/Events-decor/baby-shower-backdrop.jpg',                      caption: 'Baby Shower Backdrop Setup',             tags: ['events', 'parties'] },
  { src: '/Events-decor/backdrop-wedding.jpg',                          caption: 'Elegant Wedding Backdrop',               tags: ['events', 'decor']   },
  { src: '/Events-decor/starlight-twinkle-floor.jpg',                   caption: 'Starlight Twinkle Dance Floor',          tags: ['events', 'parties'] },
  { src: '/Events-decor/Champagne-wall.jpg',                            caption: 'Champagne Wall Display',                 tags: ['events', 'parties'] },
  { src: '/Events-decor/crystal-chair.jpg',                             caption: 'Crystal Chair Setup',                    tags: ['events', 'decor']   },
  { src: '/Events-decor/Gold-Celest-Charger.webp',                      caption: 'Gold Celest Charger Plates',             tags: ['events', 'decor']   },
  { src: '/Events-decor/faux-rose-tree.jpg',                            caption: 'Faux Rose Tree Décor',                   tags: ['events', 'decor']   },
  { src: '/Events-decor/cordless-led-red-table.jpg',                    caption: 'LED Table Centrepiece Lighting',         tags: ['events', 'decor']   },
  { src: '/Events-decor/chiara backdropa arch.jpg',                     caption: 'Chiara Backdrop Arch',                   tags: ['events', 'decor']   },
  // Catering
  { src: '/catering-services/party-serving-banku-pepper-tilapia.png',   caption: 'Banku & Pepper Tilapia Party Serving',   tags: ['catering', 'parties'] },
  { src: '/catering-services/party-serving-banku-tilapia.png',          caption: 'Banku & Tilapia Party Serving',          tags: ['catering', 'parties'] },
  { src: '/catering-services/party-serving-rice-salad-meat.png',        caption: 'Rice & Salad Party Serving',             tags: ['catering', 'parties'] },
  { src: '/catering-services/client-order-waakye-stew-meat.png',        caption: 'Waakye with Stew & Meat',                tags: ['catering']            },
  { src: '/catering-services/client-order-waakye.png',                  caption: 'Full Waakye Spread',                     tags: ['catering']            },
  { src: '/catering-services/client-order-okro-stew.png',               caption: 'Okro Stew Order',                        tags: ['catering']            },
  { src: '/catering-services/fried-rice-chicken-shito.png',             caption: 'Fried Rice with Chicken & Shito',        tags: ['catering']            },
  { src: '/catering-services/jollof.png',                               caption: 'Classic Ghanaian Jollof Rice',           tags: ['catering']            },
  { src: '/catering-services/fufu-light-soup.jpg',                      caption: 'Fufu & Light Soup',                      tags: ['catering']            },
  // Pastries & Snacks
  { src: '/catering-services/party-pastries.jpg',                       caption: 'Party Pastries Selection',               tags: ['pastries', 'parties'] },
  { src: '/catering-services/party-meat-pie.jpg',                       caption: 'Party Meat Pies',                        tags: ['pastries', 'parties'] },
  { src: '/catering-services/party-spring-rolls.jpg',                   caption: 'Party Spring Rolls',                     tags: ['pastries', 'parties'] },
  { src: '/catering-services/fried-puff-puff-bofrot.png',               caption: 'Bofrot (Puff Puff)',                     tags: ['pastries']            },
  { src: '/catering-services/pastries-donut.jpg',                       caption: 'Glazed Donuts',                          tags: ['pastries']            },
  { src: '/catering-services/party-flour-chips.jpg',                    caption: 'Party Chips',                            tags: ['pastries', 'parties'] },
  { src: '/catering-services/client-pastry-order.jpg',                  caption: 'Client Pastry Order',                    tags: ['pastries', 'parties'] },
  { src: '/catering-services/party-pastries.webp',                      caption: 'Assorted Party Pastries',                tags: ['pastries', 'parties'] },
];

const FILTERS = [
  { key: 'all',      label: 'All'            },
  { key: 'parties',  label: '🎉 Parties'     },
  { key: 'events',   label: '✨ Events & Décor' },
  { key: 'catering', label: '🍽️ Catering'   },
  { key: 'pastries', label: '🥐 Pastries'    },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState('all');

  const filtered = filter === 'all' ? ALL_IMAGES : ALL_IMAGES.filter(img => img.tags.includes(filter));

  const prev = () => setSelected(i => (i === 0 ? filtered.length - 1 : i - 1));
  const next  = () => setSelected(i => (i === filtered.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Header */}
      <div className="bg-black text-white text-center py-20 px-4">
        <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">Our Portfolio</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Event Gallery</h1>
        <p className="text-gray-300 max-w-xl mx-auto">A glimpse of what we've created , every event is unique and yours will be too.</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 border-b border-gray-100 py-4 px-4 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto hide-scroll">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => { setFilter(f.key); }}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-all ${filter === f.key ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-black'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-sm text-gray-400 mb-6">{filtered.length} photo{filtered.length !== 1 ? 's' : ''}</p>
        <AnimatePresence mode="popLayout">
          <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, i) => (
              <motion.div key={img.src + filter} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
                onClick={() => setSelected(i)}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-2xl group relative">
                <img src={img.src} alt={img.caption}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.parentElement.style.display = 'none'; }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl flex items-end p-3">
                  <p className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <button onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10">
              <ChevronLeft size={24} />
            </button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="max-w-4xl max-h-[90vh] flex flex-col items-center gap-4">
              <img src={filtered[selected]?.src} alt={filtered[selected]?.caption}
                className="max-h-[80vh] max-w-full object-contain rounded-2xl" />
              <p className="text-white text-sm font-bold">{filtered[selected]?.caption}</p>
              <p className="text-gray-500 text-xs">{selected + 1} / {filtered.length}</p>
            </motion.div>
            <button onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10">
              <ChevronRight size={24} />
            </button>
            <button onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}