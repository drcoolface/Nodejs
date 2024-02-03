

const { validateEntity, doesEntityExist, readFile, writeFile } = require('../../utils/Validation');
const fs = require('fs').promises;
const filePath = '/Users/mahesh/developer/Nodeprac/nodenew/simpleCRUD/src/data/products.json'

const ProductController = {

  async createProduct(req, res) {
    const productData = req.body;
    try {
      validateEntity(productData, "product"); 
      const existingProducts = await readFile(filePath);
      if (doesEntityExist(existingProducts, productData.id)) {
        return res.status(400).send('Product with the same ID already exists');
      }
      existingProducts.push(productData);
      writeFile(existingProducts, filePath);
    //   await fs.writeFile('products.json', JSON.stringify(existingProducts, null, 2));
      console.log('Product stored successfully');
      res.status(201).send('Product stored successfully');
    } catch (error) {
      console.error('Error storing product:', error);
      res.status(400).send(`Bad Request: ${error.message}`);
    }
  },

  async getProducts(req, res) {
    const productId = parseInt(req.query.id);

    try {
        const products = await readFile(filePath);
        if (productId) {
            // If an ID is provided, return only the product with that ID
            const product = products.find(product => product.id === productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).json(product);
        } else {
            // If no ID is provided, return all products
            res.status(200).json(products);
        }
    } catch (error) {
        console.error('Error reading the file:', error);
        res.status(500).send('Internal Server Error');
    }
},

  async updateProduct(req, res) {
    const productId = parseInt(req.params.id);
    const updatedProductData = req.body;

    try {
      validateEntity(updatedProductData, "product");

      let existingProducts = await readFile(filePath);

      const productIndex = existingProducts.findIndex(product => product.id === productId);
      if (productIndex === -1) {
        return res.status(404).send('Product not found');
      }

      existingProducts[productIndex] = { ...existingProducts[productIndex], ...updatedProductData };

      writeFile(existingProducts, filePath)
    //   await fs.writeFile('products.json', JSON.stringify(existingProducts, null, 2));

      console.log('Product updated successfully');
      res.status(200).send('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(400).send(`Bad Request: ${error.message}`);
    }
  },

  async deleteProduct(req, res) {
    const productIdToDelete = parseInt(req.params.id);

    try {
      let existingProducts = await readFile(filePath);

      const productIndexToDelete = existingProducts.findIndex(product => product.id === productIdToDelete);

      if (productIndexToDelete === -1) {
        return res.status(404).send('Product not found');
      }

      existingProducts.splice(productIndexToDelete, 1);
      writeFile(existingProducts, filePath)

    //   await fs.writeFile('products.json', JSON.stringify(existingProducts, null, 2));

      console.log('Product deleted successfully');
      res.status(200).send('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  async updateQuantity(req, res) {
    const productIdToUpdate = parseInt(req.params.id);
    const newQuantity = req.body.quantity;

    try {
      let existingProducts = await readFile(filePath);

      const productToUpdate = existingProducts.find(product => product.id === productIdToUpdate);

      if (!productToUpdate) {
        return res.status(404).send('Product not found');
      }
      const otherProperties = Object.keys(req.body).filter(prop => prop !== 'quantity');
      if (otherProperties.length > 0) {
        return res.status(400).send('Only quantity can be updated.');
      }
      productToUpdate.quantity = newQuantity;

      writeFile(existingProducts,filePath)
    //   await fs.writeFile('products.json', JSON.stringify(existingProducts, null, 2));

      console.log('Product quantity updated successfully');
      res.status(200).send('Product quantity updated successfully');
    } catch (error) {
      console.error('Error updating product quantity:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  async getOutOfStockProducts(req, res) {
    try {
      const products = await readFile(filePath);
      const outOfStockProducts = products.filter(product => product.quantity < 5);
      res.status(200).json(outOfStockProducts);
    } catch (error) {
      console.error('Error reading the file:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = ProductController;
