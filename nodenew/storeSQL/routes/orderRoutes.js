const express = require('express');
const router = express.Router();
require('dotenv').config();

const environment = process.env.NODE_ENV ;


const OrderController = require(`../controllers/${environment}/orderController`)
const CartController = require(`../controllers/${environment}/cartController`)


router.post('/cart/:id', CartController.addToCart).get('/cart/:id', CartController.getCart);
router.get('/checkout/:id', OrderController.checkOut).get('/', OrderController.getOrders);
module.exports = router;
