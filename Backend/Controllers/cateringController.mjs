import CateringItem from '../Models/CateringItem.mjs';

// Convert Google Drive share link to direct image URL
const convertDriveUrl = (url) => {
  if (!url) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
};

export const getCateringItems = async (req, res) => {
  try {
    const items = await CateringItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPublicCateringItems = async (req, res) => {
  try {
    const items = await CateringItem.find({ available: true }).sort({ category: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCateringItem = async (req, res) => {
  try {
    const { name, desc, category, image } = req.body;
    if (!name || !category) return res.status(400).json({ error: 'Name and category are required' });
    const item = await CateringItem.create({
      name, desc, category,
      image: convertDriveUrl(image),
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCateringItem = async (req, res) => {
  try {
    const { image, ...rest } = req.body;
    const update = { ...rest };
    if (image !== undefined) update.image = convertDriveUrl(image);
    const item = await CateringItem.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCateringItem = async (req, res) => {
  try {
    const item = await CateringItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleCateringItem = async (req, res) => {
  try {
    const item = await CateringItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    item.available = !item.available;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
