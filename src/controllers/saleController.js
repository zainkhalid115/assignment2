const Sale = require('../models/Sale');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

const createSale = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No items in the sale');
  }

  let calculatedTotal = 0;
  const saleItems = [];

  for (const item of items) {
      if (!item.name || item.price === undefined || item.quantity === undefined || item.quantity <= 0) {
          res.status(400);
          throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
      }
       calculatedTotal += item.price * item.quantity;
       saleItems.push({
           name: item.name,
           price: item.price,
           quantity: item.quantity
       });
  }

  const sale = new Sale({
    items: saleItems,
    totalAmount: calculatedTotal,
  });

  const createdSale = await sale.save();

  res.status(201).json(createdSale);
});

const getSales = asyncHandler(async (req, res) => {
    const sales = await Sale.find({}).sort({ createdAt: -1 });
    res.json(sales);
});

module.exports = {
  createSale,
  getSales,
};