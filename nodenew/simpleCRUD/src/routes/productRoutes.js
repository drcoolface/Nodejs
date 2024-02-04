const express = require('express');
const router = express.Router();
require('dotenv').config();
const environment =  process.env.NODE_ENV ;
const upload = require('../middleware/productImage')

const ProductController = require(`../controllers/${environment}/productController`);

router.post('/', upload, ProductController.createProduct);
router.get('/', ProductController.getProducts);

router.put('/:id', upload, ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct)

router.patch('/:id', ProductController.updateQuantity);
router.get('/outofstock', ProductController.getOutOfStockProducts);

router.patch('/image/:id', upload, ProductController.addImagesToProduct)

module.exports = router;
