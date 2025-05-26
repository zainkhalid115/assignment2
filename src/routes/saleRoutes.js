const express = require('express');
const router = express.Router();
const { createSale, getSales } = require('../controllers/saleController');

router.route('/').post(createSale).get(getSales);

module.exports = router;