import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, X, LogOut, RefreshCw,
  Search, LayoutGrid, List, ChevronLeft, ChevronRight,
  ZoomIn, ZoomOut, Move, RotateCw, Maximize2, Package, UtensilsCrossed, AlertCircle, Check,
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const CATERING_CATEGORIES = ['Main Dishes', 'Proteins', 'Snacks & Pastries', 'Sides', 'Drinks'];
const RENTAL_CATEGORIES = [
  'Chairs', 'Tables', 'Table Covers & Linens', 'Chair Covers & Bows',
  'Charger Plates', 'Plates & Bowls', 'Glassware', 'Cutlery & Serving Utensils',
  'Food Warmers & Chafing Dishes', 'Trays & Display Stands', 'Backdrops & Arches',
  'Centrepieces & Table Decor', 'Stage & Tent Structures', 'Cooling & Beverage',
  'Room Dividers', 'Umbrellas', 'Tea & Coffee Service',
];

const PAGE_SIZE = 12;

const token = () => localStorage.getItem('ga_admin_token');

const normalizeGoogleDriveUrl = (url = '') => {
  if (!url || url.startsWith('data:')) return url;

  const trimmed = url.trim();
  const fileMatch = trimmed.match(/\/file\/d\/([^/]+)/);
  const openMatch = trimmed.match(/[?&]id=([^&]+)/);
  const ucMatch = trimmed.match(/\/uc\?(?:.*&)?id=([^&]+)/);

  const fileId = fileMatch?.[1] || openMatch?.[1] || ucMatch?.[1];
  if (!fileId) return trimmed;

  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

const sanitizeItemPayload = (form = {}) => ({
  name: (form.name || '').trim(),
  desc: (form.desc || '').trim(),
  category: (form.category || '').trim(),
  image: normalizeGoogleDriveUrl((form.image || '').trim()),
  available: Boolean(form.available),
});

const api = async (path, opts = {}) => {
  const res = await fetch(`${API}${path}`, {
    method: opts.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...(opts.headers || {}),
    },
    body: opts.body,
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: text || `Request failed with status ${res.status}` };
  }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || 'Request failed');
  }

  return data;
};

/* ── SHARED STYLES ── */
const S = {
  card: { background: '#fff', border: '1.5px solid var(--brown-pale)', borderRadius: 10, overflow: 'hidden' },
  badge: (ok) => ({
    fontSize: '0.62rem',
    fontWeight: 800,
    padding: '3px 8px',
    borderRadius: 20,
    background: ok ? '#d1fae5' : '#fee2e2',
    color: ok ? '#065f46' : '#991b1b'
  }),
  input: {
    width: '100%',
    border: '1.5px solid var(--brown-pale)',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: '0.84rem',
    outline: 'none',
    fontFamily: 'inherit',
    background: '#fff',
    color: 'var(--brown-dark)'
  },
};

/* ─── IMAGE CROP / ZOOM / PREVIEW TOOL ─── */
function ImageEditor({ src: imgSrc, onApply, onCancel }) {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [rotate, setRotate] = useState(0);
  const imgRef = useRef(new Image());

  const CANVAS_W = 400;
  const CANVAS_H = 400;

  useEffect(() => {
    const img = imgRef.current;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImgLoaded(true);
      setError(false);
    };
    img.onerror = () => setError(true);
    img.src = imgSrc;
  }, [imgSrc]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgLoaded) return;

    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.save();
    ctx.translate(CANVAS_W / 2 + offset.x, CANVAS_H / 2 + offset.y);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(scale, scale);

    const ratio = Math.min(CANVAS_W / img.naturalWidth, CANVAS_H / img.naturalHeight);
    const drawW = img.naturalWidth * ratio;
    const drawH = img.naturalHeight * ratio;

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    const pad = 20;
    ctx.strokeStyle = 'rgba(245,200,66,0.9)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(pad, pad, CANVAS_W - pad * 2, CANVAS_H - pad * 2);
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(245,200,66,0.25)';
    ctx.lineWidth = 1;
    const t = pad;
    const b = CANVAS_H - pad;
    const l = pad;
    const r = CANVAS_W - pad;
    const tw = (r - l) / 3;
    const th = (b - t) / 3;

    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(l + tw * i, t);
      ctx.lineTo(l + tw * i, b);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(l, t + th * i);
      ctx.lineTo(r, t + th * i);
      ctx.stroke();
    }
  }, [imgLoaded, scale, offset, rotate]);

  useEffect(() => {
    draw();
  }, [draw]);

  const onMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const onMouseMove = (e) => {
    if (!dragging || !dragStart) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const onMouseUp = () => setDragging(false);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    setDragging(true);
    setDragStart({ x: t.clientX - offset.x, y: t.clientY - offset.y });
  };

  const onTouchMove = (e) => {
    if (!dragging || !dragStart) return;
    const t = e.touches[0];
    setOffset({ x: t.clientX - dragStart.x, y: t.clientY - dragStart.y });
  };

  const reset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setRotate(0);
  };

  const apply = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pad = 20;
    const out = document.createElement('canvas');
    out.width = CANVAS_W - pad * 2;
    out.height = CANVAS_H - pad * 2;

    const ctx2 = out.getContext('2d');
    ctx2.drawImage(canvas, pad, pad, out.width, out.height, 0, 0, out.width, out.height);

    onApply(out.toDataURL('image/jpeg', 0.92));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {error ? (
        <div style={{ padding: '2rem', textAlign: 'center', background: '#fee2e2', borderRadius: 10, fontSize: '0.8rem', color: '#991b1b', fontWeight: 700 }}>
          Could not load image. Check the URL or Drive share link.
        </div>
      ) : (
        <>
          <div
            style={{
              position: 'relative',
              borderRadius: 10,
              overflow: 'hidden',
              border: '2px solid var(--gold)',
              cursor: dragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              background: '#111'
            }}
          >
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              style={{ display: 'block', width: '100%', touchAction: 'none' }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
            />
            {!imgLoaded && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(44,26,6,0.7)', color: 'var(--gold)', fontSize: '0.82rem', fontWeight: 800 }}>
                Loading image...
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ZoomOut size={16} color="var(--brown)" />
            <input
              type="range"
              min={0.3}
              max={4}
              step={0.05}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--gold)' }}
            />
            <ZoomIn size={16} color="var(--brown)" />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brown)', minWidth: 36 }}>
              {Math.round(scale * 100)}%
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => setRotate((r) => r - 90)}
              style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: '0.74rem', fontWeight: 800, color: 'var(--brown-dark)' }}
            >
              <RotateCw size={14} style={{ transform: 'scaleX(-1)' }} /> Rotate L
            </button>
            <button
              onClick={() => setRotate((r) => r + 90)}
              style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: '0.74rem', fontWeight: 800, color: 'var(--brown-dark)' }}
            >
              <RotateCw size={14} /> Rotate R
            </button>
            <button
              onClick={reset}
              style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: '0.74rem', fontWeight: 800, color: 'var(--brown-dark)' }}
            >
              <Maximize2 size={14} /> Reset
            </button>
          </div>

          <p style={{ fontSize: '0.68rem', color: 'var(--brown-light)', textAlign: 'center', lineHeight: 1.5 }}>
            Drag to reposition. Zoom slider to scale. Dashed box is the crop area.
          </p>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={onCancel}
              style={{ flex: 1, padding: '11px', borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: 'none', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', color: 'var(--brown)' }}
            >
              Cancel
            </button>
            <button
              onClick={apply}
              style={{ flex: 1, padding: '11px', borderRadius: 8, border: 'none', background: 'var(--brown-dark)', color: 'var(--gold)', fontWeight: 900, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            >
              <Check size={15} /> Apply Crop
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── ITEM FORM MODAL ─── */
function ItemModal({ item, type, onSave, onClose }) {
  const cats = type === 'catering' ? CATERING_CATEGORIES : RENTAL_CATEGORIES;

  const [form, setForm] = useState({
    name: item?.name || '',
    desc: item?.desc || '',
    category: item?.category || cats[0],
    image: item?.image || '',
    available: item?.available !== false,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imgMode, setImgMode] = useState('url');
  const [sizeInfo, setSizeInfo] = useState('');
  const [editorSrc, setEditorSrc] = useState('');
  const fileRef = useRef(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openEditor = () => {
    if (!form.image) return;
    setEditorSrc(form.image);
    setImgMode('editor');
  };

  const compressAndEdit = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();

    reader.onload = (ev) => {
      const img = new window.Image();

      img.onload = () => {
        const MAX = 800;
        let w = img.naturalWidth;
        let h = img.naturalHeight;

        if (w > MAX) {
          h = Math.round((h * MAX) / w);
          w = MAX;
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        const compressed = canvas.toDataURL('image/jpeg', 0.82);

        setError('');
        setEditorSrc(compressed);
        setImgMode('editor');
        setSizeInfo(
          `Original: ${(file.size / 1024).toFixed(0)} KB → Compressed: ${((compressed.length * 0.75) / 1024).toFixed(0)} KB`
        );
      };

      img.onerror = () => {
        setError('Could not read the selected image');
      };

      img.src = ev.target.result;
    };

    reader.onerror = () => {
      setError('Failed to load the selected file');
    };

    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e) => {
    compressAndEdit(e.target.files?.[0]);
  };

  const applyEdit = (dataUrl) => {
    set('image', dataUrl);
    setImgMode('preview');
  };

  const submit = async () => {
    const payload = sanitizeItemPayload(form);

    if (!payload.name) {
      setError('Name is required');
      return;
    }

    if (!payload.category) {
      setError('Category is required');
      return;
    }

    if (payload.image.startsWith('data:') && payload.image.length > 900000) {
      setError('Image is too large. Please crop more or use an image URL.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(44,26,6,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: imgMode === 'editor' ? 540 : 480, padding: '1.8rem', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(44,26,6,0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.4rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: 'var(--brown-dark)' }}>
              {imgMode === 'editor' ? 'Crop and Edit Image' : item ? 'Edit Item' : 'Add New Item'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--brown)', marginTop: 2 }}>
              {imgMode === 'editor' ? 'Drag, zoom and crop your image' : type === 'catering' ? 'Catering Menu' : 'Rentals Catalogue'}
            </div>
          </div>
          <button
            onClick={imgMode === 'editor' ? () => setImgMode(form.image ? 'preview' : 'url') : onClose}
            style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid var(--brown-pale)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={15} color="var(--brown)" />
          </button>
        </div>

        {imgMode === 'editor' ? (
          <ImageEditor
            src={editorSrc}
            onApply={applyEdit}
            onCancel={() => setImgMode(form.image ? 'preview' : 'url')}
          />
        ) : (
          <>
            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', fontSize: '0.8rem', padding: '10px 14px', borderRadius: 8, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brown)', display: 'block', marginBottom: 5 }}>
                  Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  style={S.input}
                  placeholder="e.g. Jollof Rice"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brown)', display: 'block', marginBottom: 5 }}>
                  Description
                </label>
                <textarea
                  value={form.desc}
                  onChange={(e) => set('desc', e.target.value)}
                  rows={2}
                  style={{ ...S.input, resize: 'none' }}
                  placeholder="Short description..."
                />
              </div>

              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brown)', display: 'block', marginBottom: 5 }}>
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  style={S.input}
                >
                  {cats.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brown)', display: 'block', marginBottom: 8 }}>
                  Image
                </label>

                <div style={{ display: 'flex', gap: 4, background: 'var(--gold-pale)', borderRadius: 8, padding: 3, marginBottom: 10, width: 'fit-content' }}>
                  {[
                    ['url', 'Paste URL'],
                    ['upload', 'Upload File'],
                  ].map(([v, label]) => (
                    <button
                      key={v}
                      onClick={() => setImgMode(v)}
                      type="button"
                      style={{
                        padding: '6px 14px',
                        borderRadius: 6,
                        border: 'none',
                        fontWeight: 800,
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: (imgMode === v || (v === 'url' && imgMode === 'preview')) ? 'var(--brown-dark)' : 'none',
                        color: (imgMode === v || (v === 'url' && imgMode === 'preview')) ? 'var(--gold)' : 'var(--brown)'
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {imgMode === 'upload' ? (
                  <div>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.background = 'var(--gold-cream)';
                      }}
                      onDragLeave={(e) => {
                        e.currentTarget.style.background = 'var(--gold-pale)';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.background = 'var(--gold-pale)';
                        compressAndEdit(e.dataTransfer.files?.[0]);
                      }}
                      style={{ border: '2px dashed var(--gold)', borderRadius: 10, padding: '2rem', textAlign: 'center', cursor: 'pointer', background: 'var(--gold-pale)', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--gold-cream)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--gold-pale)';
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>📁</div>
                      <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--brown-dark)', marginBottom: 4 }}>
                        Click or drag image here
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--brown-light)' }}>
                        JPG, PNG, WEBP supported. Auto-compressed to save space.
                      </div>
                    </div>

                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />

                    {sizeInfo && (
                      <div style={{ marginTop: 8, fontSize: '0.68rem', color: '#065f46', fontWeight: 800, textAlign: 'center', background: '#d1fae5', borderRadius: 6, padding: '4px 10px' }}>
                        {sizeInfo}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <input
                      value={form.image.startsWith('data:') ? '(Cropped image applied)' : form.image}
                      onChange={(e) => {
                        set('image', e.target.value);
                        setImgMode('url');
                        setError('');
                      }}
                      style={{ ...S.input, marginBottom: 6 }}
                      placeholder="Paste Google Drive share link or image URL"
                    />
                    <p style={{ fontSize: '0.66rem', color: 'var(--brown-light)', marginBottom: 10 }}>
                      Google Drive: right-click image, Share, Anyone with link, Copy link
                    </p>
                  </>
                )}

                {form.image && imgMode !== 'upload' && (
                  <div style={{ borderRadius: 10, overflow: 'hidden', border: '2px solid var(--gold-pale)', position: 'relative', background: 'var(--gold-pale)', aspectRatio: '1/1', maxHeight: 220 }}>
                    <img
                      src={normalizeGoogleDriveUrl(form.image)}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', fontSize: '0.76rem', color: 'var(--brown-light)', fontWeight: 700 }}>
                      Image failed to load
                    </div>

                    <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 6 }}>
                      <button
                        onClick={openEditor}
                        type="button"
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 8, border: 'none', background: 'var(--brown-dark)', color: 'var(--gold)', fontWeight: 900, fontSize: '0.72rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(44,26,6,0.4)' }}
                      >
                        <Move size={13} /> Crop and Edit
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => set('available', !form.available)}
                  style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', background: form.available ? '#10b981' : '#d1d5db' }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 3,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#fff',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                      transition: 'left 0.2s',
                      left: form.available ? 23 : 3
                    }}
                  />
                </button>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: form.available ? '#065f46' : 'var(--brown)' }}>
                  {form.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: '1.5rem' }}>
              <button
                onClick={onClose}
                style={{ flex: 1, padding: '12px', borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: 'none', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', color: 'var(--brown)' }}
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={saving}
                style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', background: 'var(--brown-dark)', color: 'var(--gold)', fontWeight: 900, fontSize: '0.82rem', cursor: 'pointer', opacity: saving ? 0.6 : 1 }}
              >
                {saving ? 'Saving...' : item ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ─── PIN LOGIN ─── */
function PinLogin({ onLogin, isSetup, resetEnabled, onResetSuccess }) {
  const [mode, setMode] = useState(isSetup ? 'setup' : 'login');
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [masterPin, setMasterPin] = useState('');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(isSetup ? 'setup' : 'login');
  }, [isSetup]);

  const clearFields = () => {
    setPin('');
    setNewPin('');
    setMasterPin('');
  };

  const submit = async () => {
    setErr('');
    setMsg('');
    setLoading(true);

    try {
      if (mode === 'setup') {
        const cleanPin = pin.replace(/\D/g, '');
        if (cleanPin.length < 4) {
          throw new Error('PIN must be at least 4 digits');
        }

        await api('/api/auth/setup', {
          method: 'POST',
          body: JSON.stringify({ pin: cleanPin }),
        });

        const data = await api('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ pin: cleanPin }),
        });

        localStorage.setItem('ga_admin_token', data.token);
        onLogin();
        return;
      }

      if (mode === 'login') {
        const cleanPin = pin.replace(/\D/g, '');
        if (cleanPin.length < 4) {
          throw new Error('PIN must be at least 4 digits');
        }

        const data = await api('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ pin: cleanPin }),
        });

        localStorage.setItem('ga_admin_token', data.token);
        onLogin();
        return;
      }

      if (mode === 'reset') {
        const cleanMaster = masterPin.replace(/\D/g, '');
        const cleanNewPin = newPin.replace(/\D/g, '');

        if (cleanMaster.length < 4) {
          throw new Error('Enter master reset PIN');
        }

        if (cleanNewPin.length < 4) {
          throw new Error('New PIN must be at least 4 digits');
        }

        await api('/api/auth/reset', {
          method: 'POST',
          body: JSON.stringify({
            masterPin: cleanMaster,
            newPin: cleanNewPin,
          }),
        });

        setMsg('PIN reset successful. Log in with your new PIN.');
        clearFields();
        setMode('login');
        onResetSuccess?.();
        return;
      }
    } catch (e) {
      setErr(e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const title =
    mode === 'setup'
      ? 'Set Up Admin PIN'
      : mode === 'reset'
      ? 'Reset Admin PIN'
      : 'Admin Dashboard';

  const subtitle =
    mode === 'setup'
      ? 'Create your admin PIN'
      : mode === 'reset'
      ? 'Use master reset PIN to create a new admin PIN'
      : 'Enter your admin PIN';

  return (
    <div style={{ minHeight:'100vh', background:'var(--brown-dark)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <motion.div
        initial={{ opacity:0, y:24 }}
        animate={{ opacity:1, y:0 }}
        style={{ background:'#fff', borderRadius:16, padding:'2.5rem', width:'100%', maxWidth:380, boxShadow:'0 24px 64px rgba(44,26,6,0.4)' }}
      >
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ width:56, height:56, background:'var(--gold)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', fontSize:'1.5rem' }}>
            🔐
          </div>
          <div style={{ fontWeight:900, fontSize:'1.1rem', color:'var(--brown-dark)' }}>{title}</div>
          <div style={{ fontSize:'0.78rem', color:'var(--brown)', marginTop:4 }}>Golden Afrique Event</div>
          <div style={{ fontSize:'0.72rem', color:'var(--brown-light)', marginTop:8 }}>{subtitle}</div>
        </div>

        {err && (
          <div style={{ background:'#fee2e2', color:'#991b1b', fontSize:'0.78rem', padding:'10px 14px', borderRadius:8, marginBottom:14, textAlign:'center' }}>
            {err}
          </div>
        )}

        {msg && (
          <div style={{ background:'#d1fae5', color:'#065f46', fontSize:'0.78rem', padding:'10px 14px', borderRadius:8, marginBottom:14, textAlign:'center' }}>
            {msg}
          </div>
        )}

        {mode === 'reset' ? (
          <>
            <input
              type="password"
              value={masterPin}
              onChange={(e) => setMasterPin(e.target.value.replace(/\D/g, ''))}
              maxLength={12}
              placeholder="Enter master reset PIN"
              style={{ ...S.input, textAlign:'center', fontSize:'1rem', marginBottom:12 }}
            />

            <input
              type="password"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              maxLength={8}
              placeholder="Enter new admin PIN"
              style={{ ...S.input, textAlign:'center', fontSize:'1.1rem', letterSpacing:'0.35em', marginBottom:14 }}
            />
          </>
        ) : (
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            maxLength={8}
            placeholder={mode === 'setup' ? 'Create a PIN (min 4 digits)' : 'Enter your PIN'}
            style={{ ...S.input, textAlign:'center', fontSize:'1.4rem', letterSpacing:'0.5em', marginBottom:14 }}
          />
        )}

        <button
          onClick={submit}
          disabled={loading}
          style={{ width:'100%', padding:'14px', borderRadius:8, border:'none', background:'var(--brown-dark)', color:'var(--gold)', fontWeight:900, fontSize:'0.84rem', cursor:'pointer', opacity: loading ? 0.6 : 1, marginBottom:12 }}
        >
          {loading
            ? 'Please wait...'
            : mode === 'setup'
            ? 'Set Up PIN'
            : mode === 'reset'
            ? 'Reset PIN'
            : 'Enter Dashboard'}
        </button>

        <div style={{ display:'flex', justifyContent:'center', gap:10, flexWrap:'wrap' }}>
          {mode !== 'login' && (
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErr('');
                setMsg('');
                clearFields();
              }}
              style={{ background:'none', border:'none', color:'var(--brown-dark)', fontWeight:800, cursor:'pointer', fontSize:'0.78rem' }}
            >
              Back to Login
            </button>
          )}

          {mode !== 'reset' && !isSetup && resetEnabled && (
            <button
              type="button"
              onClick={() => {
                setMode('reset');
                setErr('');
                setMsg('');
                clearFields();
              }}
              style={{ background:'none', border:'none', color:'#b45309', fontWeight:800, cursor:'pointer', fontSize:'0.78rem' }}
            >
              Reset with Master PIN
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── GRID CARD ─── */
function ItemCard({ item, onEdit, onDelete, onToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ ...S.card, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--gold-pale)', flexShrink: 0 }} onClick={() => onEdit(item)}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>📦</div>
        )}

        <div style={{ position: 'absolute', top: 6, left: 6 }}>
          <span style={{ background: 'rgba(44,26,6,0.85)', color: 'var(--gold)', fontSize: '0.58rem', fontWeight: 900, padding: '3px 7px', borderRadius: 4 }}>
            {item.itemId}
          </span>
        </div>

        <div style={{ position: 'absolute', top: 6, right: 6 }}>
          <span style={S.badge(item.available)}>{item.available ? 'Live' : 'Off'}</span>
        </div>
      </div>

      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        <div style={{ fontSize: '0.62rem', color: 'var(--brown-light)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {item.category}
        </div>
        <div style={{ fontWeight: 900, fontSize: '0.84rem', color: 'var(--brown-dark)', lineHeight: 1.3 }}>
          {item.name}
        </div>
        {item.desc && (
          <div style={{ fontSize: '0.72rem', color: 'var(--brown)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.desc}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', borderTop: '1px solid var(--brown-pale)', padding: '0' }}>
        <button
          onClick={() => onToggle(item._id)}
          title={item.available ? 'Hide from menu' : 'Show on menu'}
          style={{ flex: 1, padding: '9px 0', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--brown-pale)', transition: 'background 0.15s' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--gold-pale)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          {item.available ? <EyeOff size={14} color="var(--brown)" /> : <Eye size={14} color="var(--brown)" />}
        </button>

        <button
          onClick={() => onEdit(item)}
          style={{ flex: 1, padding: '9px 0', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--brown-pale)', transition: 'background 0.15s' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--gold-pale)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          <Pencil size={14} color="var(--brown)" />
        </button>

        <button
          onClick={() => onDelete(item._id)}
          style={{ flex: 1, padding: '9px 0', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fee2e2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          <Trash2 size={14} color="#dc2626" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── LIST ROW ─── */
function ItemRow({ item, onEdit, onDelete, onToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#fff', borderRadius: 10, border: '1.5px solid var(--brown-pale)', transition: 'border-color 0.2s' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--gold)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--brown-pale)';
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', background: 'var(--gold-pale)', flexShrink: 0 }}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</div>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 900, color: 'var(--gold-dark)', fontFamily: 'monospace' }}>{item.itemId}</span>
          <span style={S.badge(item.available)}>{item.available ? 'Live' : 'Off'}</span>
        </div>
        <div style={{ fontWeight: 900, fontSize: '0.88rem', color: 'var(--brown-dark)' }}>{item.name}</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--brown-light)' }}>{item.category}</div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button onClick={() => onToggle(item._id)} style={{ width: 32, height: 32, borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {item.available ? <EyeOff size={14} color="var(--brown)" /> : <Eye size={14} color="var(--brown)" />}
        </button>
        <button onClick={() => onEdit(item)} style={{ width: 32, height: 32, borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Pencil size={14} color="var(--brown)" />
        </button>
        <button onClick={() => onDelete(item._id)} style={{ width: 32, height: 32, borderRadius: 8, border: '1.5px solid #fca5a5', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Trash2 size={14} color="#dc2626" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── MAIN ADMIN ─── */
export default function Admin() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('ga_admin_token'));
  const [isSetup, setIsSetup] = useState(false);
  const [resetEnabled, setResetEnabled] = useState(false);
  const [tab, setTab] = useState('catering');
  const [catering, setCatering] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState('');
  const [modal, setModal] = useState(null);
  const [deleteConf, setDeleteConf] = useState(null);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [avail, setAvail] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    api('/api/auth/status')
      .then((d) => {
        setIsSetup(!d.setup);
        setResetEnabled(!!d.resetEnabled);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (authed) {
      load('catering');
      load('rentals');
    }
  }, [authed]);

  useEffect(() => {
    setPage(1);
  }, [search, catFilter, avail, tab]);

  const load = async (type) => {
    setLoading(true);
    setPageError('');

    try {
      const data = await api(`/api/${type}`);
      if (type === 'catering') setCatering(Array.isArray(data) ? data : []);
      else setRentals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(`Failed to load ${type}:`, err.message);
      setPageError(err.message || `Failed to load ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (type, form, existing) => {
    const payload = sanitizeItemPayload(form);

    if (existing) {
      const u = await api(`/api/${type}/${existing._id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (type === 'catering') {
        setCatering((c) => c.map((i) => (i._id === u._id ? u : i)));
      } else {
        setRentals((r) => r.map((i) => (i._id === u._id ? u : i)));
      }
    } else {
      const u = await api(`/api/${type}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (type === 'catering') {
        setCatering((c) => [u, ...c]);
      } else {
        setRentals((r) => [u, ...r]);
      }
    }
  };

  const handleDelete = async (id, type) => {
    try {
      await api(`/api/${type}/${id}`, { method: 'DELETE' });

      if (type === 'catering') {
        setCatering((c) => c.filter((i) => i._id !== id));
      } else {
        setRentals((r) => r.filter((i) => i._id !== id));
      }

      setDeleteConf(null);
      setPageError('');
    } catch (err) {
      setPageError(err.message || 'Failed to delete item');
    }
  };

  const handleToggle = async (id, type) => {
    try {
      const u = await api(`/api/${type}/${id}/toggle`, { method: 'PATCH' });

      if (type === 'catering') {
        setCatering((c) => c.map((i) => (i._id === u._id ? u : i)));
      } else {
        setRentals((r) => r.map((i) => (i._id === u._id ? u : i)));
      }

      setPageError('');
    } catch (err) {
      setPageError(err.message || 'Failed to update item');
    }
  };

  const logout = () => {
    localStorage.removeItem('ga_admin_token');
    setAuthed(false);
  };

  if (!authed) {
    return (
      <PinLogin
        onLogin={() => setAuthed(true)}
        isSetup={isSetup}
        resetEnabled={resetEnabled}
        onResetSuccess={() => setIsSetup(false)}
      />
    );
  }

  const allItems = tab === 'catering' ? catering : rentals;
  const cats = ['All', ...(tab === 'catering' ? CATERING_CATEGORIES : RENTAL_CATEGORIES)];

  const totalC = catering.length;
  const liveC = catering.filter((i) => i.available).length;
  const totalR = rentals.length;
  const liveR = rentals.filter((i) => i.available).length;

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        (item.itemId || '').toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);

      const matchCat = catFilter === 'All' || item.category === catFilter;
      const matchAvail = avail === 'All' || (avail === 'Live' ? item.available : !item.available);

      return matchSearch && matchCat && matchAvail;
    });
  }, [allItems, search, catFilter, avail]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: 'inherit' }}>
      <div style={{ background: 'var(--brown-dark)', borderBottom: '3px solid var(--gold)', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: 'var(--gold)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UtensilsCrossed size={16} color="var(--brown-dark)" />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '0.9rem', color: 'var(--gold)' }}>Admin Dashboard</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--brown-light)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Golden Afrique Event
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => load(tab)}
            style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(245,200,66,0.3)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <RefreshCw size={14} color="var(--gold)" />
          </button>

          <button
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(245,200,66,0.3)', background: 'none', cursor: 'pointer', color: 'var(--gold)', fontWeight: 800, fontSize: '0.76rem' }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1.5rem' }}>
        {pageError && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', fontSize: '0.82rem', padding: '12px 14px', borderRadius: 8, marginBottom: '1rem' }}>
            {pageError}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: <UtensilsCrossed size={18} color="var(--gold-dark)" />, label: 'Catering Items', val: totalC, sub: `${liveC} live`, bg: 'var(--gold-pale)' },
            { icon: <Package size={18} color="var(--brown-dark)" />, label: 'Rental Items', val: totalR, sub: `${liveR} live`, bg: '#fff' },
            { icon: <Eye size={18} color="#065f46" />, label: 'Live Listings', val: liveC + liveR, sub: 'showing to customers', bg: '#d1fae5' },
            { icon: <AlertCircle size={18} color="#dc2626" />, label: 'Hidden Items', val: (totalC - liveC) + (totalR - liveR), sub: 'not visible', bg: '#fee2e2' },
          ].map((m, i) => (
            <div key={i} style={{ background: m.bg, border: '1.5px solid var(--brown-pale)', borderRadius: 10, padding: '1.1rem 1.2rem', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {m.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--brown-dark)', lineHeight: 1 }}>{m.val}</div>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--brown)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '0.66rem', color: 'var(--brown-light)', marginTop: 1 }}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 4, background: '#fff', padding: 4, borderRadius: 10, border: '1.5px solid var(--brown-pale)', marginBottom: '1.2rem', width: 'fit-content' }}>
          {[
            ['catering', '🍽️ Catering'],
            ['rentals', '🎪 Rentals'],
          ].map(([t, label]) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setSearch('');
                setCatFilter('All');
                setAvail('All');
                setPageError('');
              }}
              style={{
                padding: '9px 24px',
                borderRadius: 7,
                border: 'none',
                fontWeight: 900,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: tab === t ? 'var(--brown-dark)' : 'none',
                color: tab === t ? 'var(--gold)' : 'var(--brown)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: '1.2rem' }}>
          <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
            <Search size={15} color="var(--brown-light)" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, ID, category..."
              style={{ ...S.input, paddingLeft: 34 }}
            />
          </div>

          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} style={{ ...S.input, width: 'auto', minWidth: 140 }}>
            {cats.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select value={avail} onChange={(e) => setAvail(e.target.value)} style={{ ...S.input, width: 'auto' }}>
            <option>All</option>
            <option>Live</option>
            <option>Off</option>
          </select>

          <div style={{ display: 'flex', gap: 2, background: 'var(--gold-pale)', borderRadius: 8, padding: 3 }}>
            {[
              ['grid', <LayoutGrid size={15} />],
              ['list', <List size={15} />],
            ].map(([v, icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: view === v ? 'var(--brown-dark)' : 'none',
                  color: view === v ? 'var(--gold)' : 'var(--brown)'
                }}
              >
                {icon}
              </button>
            ))}
          </div>

          <button
            onClick={() => setModal({ type: tab, item: null })}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 8, border: 'none', background: 'var(--gold)', color: 'var(--brown-dark)', fontWeight: 900, fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            <Plus size={16} /> Add Item
          </button>
        </div>

        <div style={{ fontSize: '0.76rem', color: 'var(--brown)', fontWeight: 700, marginBottom: '1rem' }}>
          {filtered.length} item{filtered.length !== 1 ? 's' : ''} {search || catFilter !== 'All' || avail !== 'All' ? 'found' : 'total'}
          {safePage > 1 && ` — page ${safePage} of ${totalPages}`}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--brown-light)', fontWeight: 800 }}>Loading...</div>
        ) : paged.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📭</div>
            <div style={{ fontWeight: 800, color: 'var(--brown)', fontSize: '0.9rem' }}>No items found</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--brown-light)', marginTop: 6 }}>Try adjusting your search or filters</div>
          </div>
        ) : view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: '1rem' }}>
            {paged.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onEdit={(i) => setModal({ type: tab, item: i })}
                onDelete={(id) => setDeleteConf({ id, type: tab })}
                onToggle={(id) => handleToggle(id, tab)}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {paged.map((item) => (
              <ItemRow
                key={item._id}
                item={item}
                onEdit={(i) => setModal({ type: tab, item: i })}
                onDelete={(id) => setDeleteConf({ id, type: tab })}
                onToggle={(id) => handleToggle(id, tab)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: '2rem', paddingBottom: '2rem' }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              style={{ width: 36, height: 36, borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: safePage === 1 ? 'var(--gold-pale)' : '#fff', cursor: safePage === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={16} color="var(--brown)" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: '1.5px solid',
                  fontWeight: 900,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  borderColor: n === safePage ? 'var(--brown-dark)' : 'var(--brown-pale)',
                  background: n === safePage ? 'var(--brown-dark)' : '#fff',
                  color: n === safePage ? 'var(--gold)' : 'var(--brown-dark)'
                }}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              style={{ width: 36, height: 36, borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: safePage === totalPages ? 'var(--gold-pale)' : '#fff', cursor: safePage === totalPages ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={16} color="var(--brown)" />
            </button>
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--gold-pale)', borderTop: '2px solid var(--gold)', padding: '10px 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--brown-dark)', fontWeight: 700 }}>
          Image tip: Upload images to Google Drive. Right-click, Share, Anyone with link, Copy link. Never delete that folder.
        </p>
      </div>

      <AnimatePresence>
        {modal && (
          <ItemModal
            item={modal.item}
            type={modal.type}
            onSave={(form) => handleSave(modal.type, form, modal.item)}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConf && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(44,26,6,0.6)' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 340, width: '100%', textAlign: 'center', boxShadow: '0 24px 64px rgba(44,26,6,0.3)' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🗑️</div>
              <div style={{ fontWeight: 900, fontSize: '1rem', color: 'var(--brown-dark)', marginBottom: 8 }}>
                Delete this item?
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--brown)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                This cannot be undone. The item will be permanently removed from the catalogue.
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setDeleteConf(null)}
                  style={{ flex: 1, padding: '12px', borderRadius: 8, border: '1.5px solid var(--brown-pale)', background: 'none', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer', color: 'var(--brown)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConf.id, deleteConf.type)}
                  style={{ flex: 1, padding: '12px', borderRadius: 8, border: 'none', background: '#dc2626', color: '#fff', fontWeight: 900, fontSize: '0.82rem', cursor: 'pointer' }}
                >
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
