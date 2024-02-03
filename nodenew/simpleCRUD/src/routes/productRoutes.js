const express = require('express');
const router = express.Router();
require('dotenv').config();

const environment =  process.env.NODE_ENV ;

const ProductController = require(`../controllers/${environment}/productController`);

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);

router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct)

router.patch('/:id', ProductController.updateQuantity);
router.get('/outofstock', ProductController.getOutOfStockProducts);

module.exports = router;
