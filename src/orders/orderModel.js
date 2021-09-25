import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import lastModified from '../plugins/lastModified';

export const OrderSchema = new Schema({
    cost: {
        type: Number
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products: [{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: mongoose.Schema.Types.Number
      }
    }]
},{
  timestamps: true
});
  
OrderSchema.plugin(lastModified);
// soft delete
OrderSchema.plugin(mongoose_delete, { deletedAt: true, overrideMethods: 'all' });

export const OrderModel = mongoose.model('Order', OrderSchema);
