import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  itemId:    { type: String, unique: true },
  name:      { type: String, required: true, trim: true },
  desc:      { type: String, default: '' },
  category:  { type: String, required: true },
  image:     { type: String, default: '' },
  available: { type: Boolean, default: true },
}, { timestamps: true });

rentalSchema.pre('save', async function () {
  if (!this.isNew) return;
  const count = await mongoose.model('RentalItem').countDocuments();
  this.itemId = `R${String(count + 1).padStart(3, '0')}`;
});

const RentalItem = mongoose.model('RentalItem', rentalSchema);
export default RentalItem;
