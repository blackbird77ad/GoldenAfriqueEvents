import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema(
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

const RentalItem = mongoose.model('RentalItem', rentalSchema);
export default RentalItem;