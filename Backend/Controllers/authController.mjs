import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../Models/Admin.mjs';

const sanitizePin = (value) => String(value || '').replace(/\D/g, '');

export const setupPin = async (req, res) => {
  try {
    const existing = await Admin.findOne();
    if (existing) {
      return res.status(400).json({ error: 'Admin already set up' });
    }

    const pin = sanitizePin(req.body?.pin);
    if (pin.length < 4) {
      return res.status(400).json({ error: 'PIN must be at least 4 digits' });
    }

    const pinHash = await bcrypt.hash(pin, 10);
    await Admin.create({ pinHash });

    res.json({
      message: 'PIN set up successfully',
      setup: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to set up PIN' });
  }
};

export const loginWithPin = async (req, res) => {
  try {
    const pin = sanitizePin(req.body?.pin);
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({
        error: 'No admin set up yet. Please set up your PIN first.',
      });
    }

    const match = await bcrypt.compare(pin, admin.pinHash);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect PIN' });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
};

export const resetPin = async (req, res) => {
  try {
    const masterPin = sanitizePin(req.body?.masterPin);
    const newPin = sanitizePin(req.body?.newPin);

    if (!process.env.MASTER_RESET_PIN) {
      return res.status(500).json({
        error: 'MASTER_RESET_PIN is missing in .env',
      });
    }

    if (masterPin !== sanitizePin(process.env.MASTER_RESET_PIN)) {
      return res.status(401).json({ error: 'Incorrect master reset PIN' });
    }

    if (newPin.length < 4) {
      return res.status(400).json({
        error: 'New PIN must be at least 4 digits',
      });
    }

    const pinHash = await bcrypt.hash(newPin, 10);

    await Admin.findOneAndUpdate(
      {},
      { pinHash },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    res.json({
      message: 'PIN reset successfully',
      reset: true,
      setup: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'PIN reset failed' });
  }
};

export const checkStatus = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    res.json({
      setup: !!admin,
      resetEnabled: !!process.env.MASTER_RESET_PIN,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to check auth status' });
  }
};