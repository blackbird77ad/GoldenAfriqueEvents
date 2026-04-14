import RentalItem from '../Models/RentalItem.mjs';
import { getNextItemId } from '../utils/itemId.mjs';

const convertDriveUrl = (url) => {
  if (!url) return url;

  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  const fileId = fileMatch?.[1] || idMatch?.[1];
  if (fileId) return `https://drive.google.com/uc?export=view&id=${fileId}`;

  return url;
};

const cleanPayload = (body = {}) => ({
  name: body.name?.trim(),
  desc: body.desc?.trim() || '',
  category: body.category?.trim(),
  image: convertDriveUrl(body.image?.trim?.() || body.image || ''),
  available: body.available !== false,
});

export const getRentalItems = async (req, res) => {
  try {
    const items = await RentalItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPublicRentalItems = async (req, res) => {
  try {
    const items = await RentalItem.find({ available: true }).sort({
      category: 1,
      createdAt: 1,
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRentalItem = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);

    if (!payload.name || !payload.category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    const itemId = await getNextItemId({
      counterName: 'rentalItem',
      prefix: 'R',
    });

    const item = await RentalItem.create({
      ...payload,
      itemId,
    });

    res.status(201).json(item);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate rental item ID. Please try again.',
      });
    }

    res.status(500).json({ error: err.message });
  }
};

export const updateRentalItem = async (req, res) => {
  try {
    const { itemId, ...rest } = req.body || {};
    const update = cleanPayload(rest);

    const item = await RentalItem.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ error: 'Item not found' });

    res.json(item);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate rental item ID.',
      });
    }

    res.status(500).json({ error: err.message });
  }
};

export const deleteRentalItem = async (req, res) => {
  try {
    const item = await RentalItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleRentalItem = async (req, res) => {
  try {
    const item = await RentalItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.available = !item.available;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};