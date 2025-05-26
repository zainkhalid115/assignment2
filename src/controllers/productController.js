const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined || price < 0) {
      res.status(400);
      throw new Error('Please provide valid name and price for the product.');
  }

  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error('Product with this name already exists');
  }

  const product = new Product({
    name,
    price,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

module.exports = {
  getProducts,
  createProduct,
};