import mongoose from 'mongoose';

const cateringSchema = new mongoose.Schema(
  {
    itemId: { type: String, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    desc: { type: String, default: '' },
    category: { type: String, required: true },
    image: { type: String, default: '' },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CateringItem = mongoose.model('CateringItem', cateringSchema);
export default CateringItem;