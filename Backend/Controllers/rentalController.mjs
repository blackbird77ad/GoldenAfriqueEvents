import RentalItem from '../Models/RentalItem.mjs';

const convertDriveUrl = (url) => {
  if (!url) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
};

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
    const items = await RentalItem.find({ available: true }).sort({ category: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createRentalItem = async (req, res) => {
  try {
    const { name, desc, category, image } = req.body;
    if (!name || !category) return res.status(400).json({ error: 'Name and category are required' });
    const item = await RentalItem.create({
      name, desc, category,
      image: convertDriveUrl(image),
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRentalItem = async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const update = { ...rest };
    if (image !== undefined) update.image = convertDriveUrl(image);
    const item = await RentalItem.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
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
