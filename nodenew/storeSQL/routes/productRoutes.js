const express = require('express');
const authenticateToken = require('../middlewares/authentication');
const router = express.Router();
require('dotenv').config();
const environment =  process.env.NODE_ENV ;


const ProductController = require(`../controllers/${environment}/productController`);

router.post('/', authenticateToken, ProductController.createProduct);
router.get('/', ProductController.getProducts);

router.put('/:id',authenticateToken, ProductController.updateProduct);
router.delete('/:id', authenticateToken, ProductController.deleteProduct)

router.patch('/:id',authenticateToken, ProductController.updateQuantity);


module.exports = router;
