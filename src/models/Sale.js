const mongoose = require('mongoose');

const saleItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1, min: 1 },
});

const saleSchema = mongoose.Schema(
  {
    items: [saleItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
      min: 0
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;