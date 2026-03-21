import 'dotenv/config';
import bcrypt   from 'bcryptjs';
import jwt      from 'jsonwebtoken';
import Admin    from '../Models/Admin.mjs';

// POST /api/auth/setup — first time PIN setup (only works if no admin exists)
export const setupPin = async (req, res) => {
  try {
    const existing = await Admin.findOne();
    if (existing) return res.status(400).json({ error: 'Admin already set up' });

    const { pin } = req.body;
    if (!pin || pin.length < 4) return res.status(400).json({ error: 'PIN must be at least 4 digits' });

    const pinHash = await bcrypt.hash(pin, 10);
    await Admin.create({ pinHash });
    res.json({ message: 'PIN set up successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/login — login with PIN
export const loginWithPin = async (req, res) => {
  try {
    const { pin } = req.body;
    const admin   = await Admin.findOne();

    if (!admin) return res.status(404).json({ error: 'No admin set up yet. Please set up your PIN first.' });

    const match = await bcrypt.compare(String(pin), admin.pinHash);
    if (!match) return res.status(401).json({ error: 'Incorrect PIN' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/reset — reset PIN using master reset PIN
export const resetPin = async (req, res) => {
  try {
    const { masterPin, newPin } = req.body;

    if (String(masterPin) !== String(process.env.MASTER_RESET_PIN)) {
      return res.status(401).json({ error: 'Incorrect master PIN' });
    }

    if (!newPin || newPin.length < 4) {
      return res.status(400).json({ error: 'New PIN must be at least 4 digits' });
    }

    const pinHash = await bcrypt.hash(String(newPin), 10);
    await Admin.findOneAndUpdate({}, { pinHash }, { upsert: true });
    res.json({ message: 'PIN reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/auth/status — check if admin is set up
export const checkStatus = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    res.json({ setup: !!admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
