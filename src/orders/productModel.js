import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number
  },
});

export const ProductModel = mongoose.model('Product', ProductSchema);
