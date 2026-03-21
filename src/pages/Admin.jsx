import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check, LogOut, RefreshCw } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const CATERING_CATEGORIES = ['Main Dishes', 'Proteins', 'Snacks & Pastries', 'Sides', 'Drinks'];
const RENTAL_CATEGORIES   = [
  'Chairs', 'Tables', 'Table Covers & Linens', 'Chair Covers & Bows',
  'Charger Plates', 'Plates & Bowls', 'Glassware', 'Cutlery & Serving Utensils',
  'Food Warmers & Chafing Dishes', 'Trays & Display Stands', 'Backdrops & Arches',
  'Centrepieces & Table Décor', 'Stage & Tent Structures', 'Cooling & Beverage',
  'Room Dividers', 'Umbrellas', 'Tea & Coffee Service',
];

const token = () => localStorage.getItem('ga_admin_token');

const api = async (path, opts = {}) => {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(token() ? { Authorization: `Bearer ${token()}` } : {}) },
    ...opts,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};

/* ─── ITEM FORM MODAL ─── */
const ItemModal = ({ item, type, onSave, onClose }) => {
  const cats  = type === 'catering' ? CATERING_CATEGORIES : RENTAL_CATEGORIES;
  const [form, setForm] = useState({
    name:      item?.name     || '',
    desc:      item?.desc     || '',
    category:  item?.category || cats[0],
    image:     item?.image    || '',
    available: item?.available !== false,
  });
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name.trim()) { setError('Name is required'); return; }
    setSaving(true); setError('');
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        <div className="flex justify-between items-center mb-5">
          <h3 className="font-extrabold text-lg">{item ? 'Edit Item' : 'Add New Item'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
            <X size={16} />
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-xl mb-4">{error}</div>}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-all"
              placeholder="e.g. Jollof Rice" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Description</label>
            <textarea value={form.desc} onChange={e => set('desc', e.target.value)} rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-all resize-none"
              placeholder="Short description..." />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Category *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-all bg-white">
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Image URL or Google Drive Link</label>
            <input value={form.image} onChange={e => set('image', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-all"
              placeholder="Paste Google Drive share link or image URL" />
            <p className="text-xs text-gray-400 mt-1">Tip: In Google Drive, right-click image → Share → Anyone with link → Copy link</p>
          </div>

          {form.image && (
            <div className="rounded-xl overflow-hidden border border-gray-100 aspect-video bg-gray-50">
              <img src={form.image} alt="Preview" className="w-full h-full object-cover"
                onError={e => { e.target.src = ''; e.target.parentElement.innerHTML = '<p class="text-xs text-gray-400 flex items-center justify-center h-full">Image preview failed — check the URL</p>'; }} />
            </div>
          )}

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => set('available', !form.available)}
              className={`w-12 h-6 rounded-full transition-all relative ${form.available ? 'bg-green-400' : 'bg-gray-200'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.available ? 'left-7' : 'left-1'}`} />
            </button>
            <span className="text-sm font-bold">{form.available ? 'Available' : 'Unavailable'}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 font-bold text-sm hover:border-black transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="flex-1 py-3 rounded-2xl bg-black text-yellow-400 font-extrabold text-sm hover:bg-gray-800 transition-all disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Item'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── PIN LOGIN ─── */
const PinLogin = ({ onLogin, isSetup }) => {
  const [pin,   setPin]   = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (pin.length < 4) { setError('PIN must be at least 4 digits'); return; }
    setLoading(true); setError('');
    try {
      if (isSetup) {
        await api('/api/auth/setup', { method: 'POST', body: JSON.stringify({ pin }) });
        const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ pin }) });
        localStorage.setItem('ga_admin_token', data.token);
        onLogin();
      } else {
        const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ pin }) });
        localStorage.setItem('ga_admin_token', data.token);
        onLogin();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-4 text-2xl">🔐</div>
          <h1 className="font-extrabold text-xl">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Golden Afrique Event</p>
          {isSetup && <p className="text-blue-600 text-xs mt-2 font-bold">First time? Create your PIN below</p>}
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-xl mb-4 text-center">{error}</div>}

        <input type="password" value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder={isSetup ? 'Create a PIN (min 4 digits)' : 'Enter your PIN'}
          maxLength={8}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-all text-center text-2xl tracking-[0.5em] mb-4" />

        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-4 rounded-2xl bg-black text-yellow-400 font-extrabold text-sm hover:bg-gray-800 transition-all disabled:opacity-50">
          {loading ? 'Please wait...' : isSetup ? 'Set Up PIN' : 'Enter Dashboard'}
        </button>
      </motion.div>
    </div>
  );
};

/* ─── PIN RESET ─── */
const PinReset = ({ onBack }) => {
  const [masterPin, setMasterPin] = useState('');
  const [newPin,    setNewPin]    = useState('');
  const [msg,       setMsg]       = useState('');
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  const handleReset = async () => {
    setLoading(true); setMsg(''); setError('');
    try {
      await api('/api/auth/reset', { method: 'POST', body: JSON.stringify({ masterPin, newPin }) });
      setMsg('PIN reset successfully! You can now log in with your new PIN.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
        <h2 className="font-extrabold text-xl mb-2">Reset PIN</h2>
        <p className="text-gray-500 text-sm mb-6">Enter your master reset PIN and choose a new login PIN.</p>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-xl mb-4">{error}</div>}
        {msg   && <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2 rounded-xl mb-4">{msg}</div>}

        <div className="flex flex-col gap-3 mb-5">
          <input type="password" value={masterPin} onChange={e => setMasterPin(e.target.value)}
            placeholder="Master reset PIN" maxLength={8}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-all" />
          <input type="password" value={newPin} onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
            placeholder="New PIN (min 4 digits)" maxLength={8}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-all" />
        </div>

        <button onClick={handleReset} disabled={loading}
          className="w-full py-3 rounded-2xl bg-black text-yellow-400 font-extrabold text-sm hover:bg-gray-800 transition-all disabled:opacity-50 mb-3">
          {loading ? 'Resetting...' : 'Reset PIN'}
        </button>
        <button onClick={onBack} className="w-full py-3 rounded-2xl border border-gray-200 text-gray-500 font-bold text-sm hover:border-black transition-all">
          Back to Login
        </button>
      </motion.div>
    </div>
  );
};

/* ─── ITEMS TABLE ─── */
const ItemsTable = ({ items, onEdit, onDelete, onToggle, loading }) => {
  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (!items.length) return (
    <div className="text-center py-20">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-gray-400 font-bold">No items yet — add your first one!</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {items.map(item => (
        <motion.div key={item._id} layout
          className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-300 transition-all bg-white">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            {item.image
              ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
              : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No img</div>
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-yellow-600">{item.itemId}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div className="font-extrabold text-sm mt-0.5">{item.name}</div>
            <div className="text-xs text-gray-400">{item.category}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => onToggle(item._id)}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-all"
              title={item.available ? 'Mark unavailable' : 'Mark available'}>
              {item.available ? <EyeOff size={14} className="text-gray-500" /> : <Eye size={14} className="text-gray-500" />}
            </button>
            <button onClick={() => onEdit(item)}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-all">
              <Pencil size={14} className="text-gray-500" />
            </button>
            <button onClick={() => onDelete(item._id)}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-500 hover:border transition-all">
              <Trash2 size={14} className="text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── MAIN ADMIN PAGE ─── */
export default function Admin() {
  const [authed,     setAuthed]     = useState(!!localStorage.getItem('ga_admin_token'));
  const [isSetup,    setIsSetup]    = useState(false);
  const [showReset,  setShowReset]  = useState(false);
  const [tab,        setTab]        = useState('catering');
  const [catering,   setCatering]   = useState([]);
  const [rentals,    setRentals]    = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [modal,      setModal]      = useState(null); // { type, item }
  const [deleteConf, setDeleteConf] = useState(null); // { id, type }

  useEffect(() => {
    api('/api/auth/status').then(d => { if (!d.setup) setIsSetup(true); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (authed) { fetchCatering(); fetchRentals(); }
  }, [authed]);

  const fetchCatering = async () => {
    setLoading(true);
    try { setCatering(await api('/api/catering')); } catch { /* ignore */ }
    setLoading(false);
  };

  const fetchRentals = async () => {
    try { setRentals(await api('/api/rentals')); } catch { /* ignore */ }
  };

  const handleSave = async (type, form, existing) => {
    if (existing) {
      const updated = await api(`/api/${type}/${existing._id}`, { method: 'PUT', body: JSON.stringify(form) });
      if (type === 'catering') setCatering(c => c.map(i => i._id === updated._id ? updated : i));
      else setRentals(r => r.map(i => i._id === updated._id ? updated : i));
    } else {
      const created = await api(`/api/${type}`, { method: 'POST', body: JSON.stringify(form) });
      if (type === 'catering') setCatering(c => [created, ...c]);
      else setRentals(r => [created, ...r]);
    }
  };

  const handleDelete = async (id, type) => {
    await api(`/api/${type}/${id}`, { method: 'DELETE' });
    if (type === 'catering') setCatering(c => c.filter(i => i._id !== id));
    else setRentals(r => r.filter(i => i._id !== id));
    setDeleteConf(null);
  };

  const handleToggle = async (id, type) => {
    const updated = await api(`/api/${type}/${id}/toggle`, { method: 'PATCH' });
    if (type === 'catering') setCatering(c => c.map(i => i._id === updated._id ? updated : i));
    else setRentals(r => r.map(i => i._id === updated._id ? updated : i));
  };

  const logout = () => { localStorage.removeItem('ga_admin_token'); setAuthed(false); };

  if (showReset) return <PinReset onBack={() => setShowReset(false)} />;
  if (!authed) return (
    <div>
      <PinLogin onLogin={() => setAuthed(true)} isSetup={isSetup} />
      <div className="fixed bottom-4 left-0 right-0 text-center">
        <button onClick={() => setShowReset(true)} className="text-xs text-gray-500 hover:text-white transition-colors">
          Forgot PIN? Reset here
        </button>
      </div>
    </div>
  );

  const items   = tab === 'catering' ? catering : rentals;
  const refresh = tab === 'catering' ? fetchCatering : fetchRentals;

  return (
    <div className="min-h-screen bg-gray-50 pt-0">

      {/* Header */}
      <div className="bg-black text-white px-4 py-4 flex items-center justify-between">
        <div>
          <div className="font-extrabold text-base">Admin Dashboard</div>
          <div className="text-yellow-400 text-xs">Golden Afrique Event</div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refresh} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" title="Refresh">
            <RefreshCw size={15} className="text-white" />
          </button>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-all">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Catering Items</div>
          <div className="text-2xl font-extrabold">{catering.length}</div>
          <div className="text-xs text-green-600">{catering.filter(i => i.available).length} available</div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">Rental Items</div>
          <div className="text-2xl font-extrabold">{rentals.length}</div>
          <div className="text-xs text-green-600">{rentals.filter(i => i.available).length} available</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 bg-white rounded-2xl p-1 border border-gray-100">
          {['catering', 'rentals'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-extrabold capitalize transition-all ${tab === t ? 'bg-black text-yellow-400' : 'text-gray-500 hover:text-black'}`}>
              {t === 'catering' ? '🍽️ Catering' : '🎪 Rentals'}
            </button>
          ))}
        </div>
      </div>

      {/* Add button */}
      <div className="px-4 mb-4 flex justify-between items-center">
        <p className="text-sm font-bold text-gray-600">{items.length} items</p>
        <button onClick={() => setModal({ type: tab, item: null })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-yellow-400 font-extrabold text-sm hover:bg-gray-800 transition-all">
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Items */}
      <div className="px-4 pb-20">
        <ItemsTable
          items={items}
          loading={loading}
          onEdit={item => setModal({ type: tab, item })}
          onDelete={id => setDeleteConf({ id, type: tab })}
          onToggle={id => handleToggle(id, tab)}
        />
      </div>

      {/* Google Drive image tip */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t border-yellow-100 px-4 py-3">
        <p className="text-xs text-yellow-800 text-center leading-relaxed">
          📌 <strong>Image tip:</strong> Upload images to a dedicated Google Drive folder. Never delete that folder — deleting images will break them on the website.
        </p>
      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {modal && (
          <ItemModal
            item={modal.item}
            type={modal.type}
            onSave={form => handleSave(modal.type, form, modal.item)}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteConf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
              <div className="text-4xl mb-3">🗑️</div>
              <h3 className="font-extrabold text-lg mb-2">Delete this item?</h3>
              <p className="text-gray-500 text-sm mb-6">This cannot be undone. The item will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConf(null)}
                  className="flex-1 py-3 rounded-2xl border-2 border-gray-200 font-bold text-sm hover:border-black transition-all">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConf.id, deleteConf.type)}
                  className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-extrabold text-sm hover:bg-red-600 transition-all">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}