import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.mjs';
import authRoutes from './Routes/auth.mjs';
import cateringRoutes from './Routes/catering.mjs';
import rentalRoutes from './Routes/rentals.mjs';
import CateringItem from './Models/CateringItem.mjs';
import RentalItem from './Models/RentalItem.mjs';
import { syncCounterWithCollection } from './utils/itemId.mjs';

const app = express();
const PORT = process.env.PORT || 8001;

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
];

const normalizeOrigin = (origin = '') => origin.trim().replace(/\/+$/, '');

const envOrigins = [
  process.env.FRONTEND_URL,
  process.env.CLOUDFLARE_URL,
  process.env.CUSTOM_DOMAIN_URL,
  ...(process.env.ALLOWED_ORIGINS || '').split(','),
]
  .map(normalizeOrigin)
  .filter(Boolean);

const ALLOWED_ORIGINS = [
  ...new Set(
    [...DEFAULT_ALLOWED_ORIGINS, ...envOrigins]
      .map(normalizeOrigin)
      .filter(Boolean)
  ),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from tools and health checks that don't send an Origin header.
    if (!origin) return callback(null, true);

    const normalizedOrigin = normalizeOrigin(origin);
    if (ALLOWED_ORIGINS.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '5mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/catering', cateringRoutes);
app.use('/api/rentals', rentalRoutes);

app.get('/', (req, res) => res.send('Golden Afrique Event API running'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
});

const start = async () => {
  await connectDB();

  await syncCounterWithCollection({
    counterName: 'cateringItem',
    Model: CateringItem,
    prefix: 'C',
  });

  await syncCounterWithCollection({
    counterName: 'rentalItem',
    Model: RentalItem,
    prefix: 'R',
  });

  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
};

start();
