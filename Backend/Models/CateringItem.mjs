import mongoose from 'mongoose';

const cateringSchema = new mongoose.Schema({
  itemId:    { type: String, unique: true },
  name:      { type: String, required: true, trim: true },
  desc:      { type: String, default: '' },
  category:  { type: String, required: true },
  image:     { type: String, default: '' },
  available: { type: Boolean, default: true },
}, { timestamps: true });

cateringSchema.pre('save', async function () {
  if (!this.isNew) return;
  const count = await mongoose.model('CateringItem').countDocuments();
  this.itemId = `C${String(count + 1).padStart(3, '0')}`;
});

const CateringItem = mongoose.model('CateringItem', cateringSchema);
export default CateringItem;
