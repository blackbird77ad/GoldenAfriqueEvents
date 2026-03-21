import mongoose from 'mongoose';

let cateringCounter = 0;

const cateringSchema = new mongoose.Schema({
  itemId:    { type: String, unique: true },
  name:      { type: String, required: true, trim: true },
  desc:      { type: String, default: '' },
  category:  { type: String, required: true },
  image:     { type: String, default: '' },
  available: { type: Boolean, default: true },
}, { timestamps: true });

cateringSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  const count = await mongoose.model('CateringItem').countDocuments();
  this.itemId = `C${String(count + 1).padStart(3, '0')}`;
  next();
});

const CateringItem = mongoose.model('CateringItem', cateringSchema);
export default CateringItem;
