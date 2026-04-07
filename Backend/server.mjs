import 'dotenv/config';
import express      from 'express';
import cors         from 'cors';
import connectDB    from './config/db.mjs';
import authRoutes     from './Routes/auth.mjs';
import cateringRoutes from './Routes/catering.mjs';
import rentalRoutes   from './Routes/rentals.mjs';

const app  = express();
const PORT = process.env.PORT || 8001;

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
 'https://goldenafriqueevents.com',
'https://www.goldenafriqueevents.com',
'https://goldenafriqueevents.pages.dev',
];

app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(express.json({ limit: '5mb' }));

app.use('/api/auth',     authRoutes);
app.use('/api/catering', cateringRoutes);
app.use('/api/rentals',  rentalRoutes);

app.get('/', (req, res) => res.send('Golden Afrique Event API running'));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Server error' });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
};

start();
