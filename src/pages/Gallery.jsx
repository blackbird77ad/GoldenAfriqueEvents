import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY = [
  { src: '/Events-decor/stage-setup-candles-chairs-backdrop.jpg',      caption: 'Full Stage Setup with Backdrop'        },
  { src: '/Events-decor/double-layer-stage-setup.jpg',                  caption: 'Double Layer Event Stage'              },
  { src: '/Events-decor/serpentine-throne-table-chairs.jpg',            caption: 'Serpentine Throne Table & Chairs'      },
  { src: '/Events-decor/golden-centerpiece.jpg',                        caption: 'Golden Table Centrepiece'              },
  { src: '/Events-decor/backdrop-gold.png',                             caption: 'Gold Sequin Backdrop'                  },
  { src: '/Events-decor/charger-setup.png',                             caption: 'Charger Plate Table Setup'             },
  { src: '/Events-decor/high-chairs-bridal.jpg',                        caption: 'Bridal High Chairs'                    },
  { src: '/Events-decor/candelabra-centerpeice.jpg',                    caption: 'Candelabra Centrepiece'                },
  { src: '/Events-decor/white-floral-wedding-arch.jpg',                 caption: 'White Floral Wedding Arch'             },
  { src: '/Events-decor/peach-floral-arch.jpg',                         caption: 'Peach Floral Arch'                     },
  { src: '/Events-decor/green-floral-arch.jpg',                         caption: 'Green Floral Arch'                     },
  { src: '/Events-decor/baby-shower-backdrop.jpg',                      caption: 'Baby Shower Backdrop'                  },
  { src: '/Events-decor/starlight-twinkle-floor.jpg',                   caption: 'Starlight Twinkle Dance Floor'         },
  { src: '/Events-decor/Champagne-wall.jpg',                            caption: 'Champagne Wall Display'                },
  { src: '/Events-decor/crystal-chair.jpg',                             caption: 'Crystal Chairs'                        },
  { src: '/Events-decor/Gold-Celest-Charger.webp',                      caption: 'Gold Celest Charger Plates'            },
  { src: '/catering-services/party-serving-banku-pepper-tilapia.png',   caption: 'Banku & Pepper Tilapia Party Serving'  },
  { src: '/catering-services/party-serving-rice-salad-meat.png',        caption: 'Rice & Salad Party Serving'            },
  { src: '/catering-services/client-order-waakye-stew-meat.png',        caption: 'Waakye with Stew & Meat'              },
  { src: '/catering-services/fried-rice-chicken-shito.png',             caption: 'Fried Rice with Chicken'               },
  { src: '/catering-services/party-pastries.jpg',                       caption: 'Party Pastries'                        },
  { src: '/catering-services/party-spring-rolls.jpg',                   caption: 'Spring Rolls'                          },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  const prev = () => setSelected(i => (i === 0 ? GALLERY.length - 1 : i - 1));
  const next  = () => setSelected(i => (i === GALLERY.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">

      {/* Header */}
      <div className="bg-black text-white text-center py-20 px-4">
        <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">Our Portfolio</p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Event Gallery</h1>
        <p className="text-gray-300 max-w-xl mx-auto">A glimpse of what we've created for our clients. Every event is unique — yours will be too.</p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {GALLERY.map((img, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              onClick={() => setSelected(i)}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-2xl group">
              <img src={img.src} alt={img.caption}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={e => { e.target.parentElement.style.display = 'none'; }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>

            <button onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
              <ChevronLeft size={24} />
            </button>

            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="max-w-4xl max-h-[90vh] flex flex-col items-center gap-4">
              <img src={GALLERY[selected].src} alt={GALLERY[selected].caption}
                className="max-h-[80vh] max-w-full object-contain rounded-2xl" />
              <p className="text-white text-sm font-bold">{GALLERY[selected].caption}</p>
              <p className="text-gray-500 text-xs">{selected + 1} / {GALLERY.length}</p>
            </motion.div>

            <button onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
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