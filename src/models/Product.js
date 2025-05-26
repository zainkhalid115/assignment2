const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0
  },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;