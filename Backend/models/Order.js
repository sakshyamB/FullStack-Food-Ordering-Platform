const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foods',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    required: true,
    default: 0
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'Card', 'Mobile Banking', 'E-sewa', 'Khalti'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
