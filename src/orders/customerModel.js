import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  }
},{
  timestamps: true
});

export const CustomerModel = mongoose.model('Customer', CustomerSchema,);
