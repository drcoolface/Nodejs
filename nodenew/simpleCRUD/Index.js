const express = require('express')
const {validateProduct, isProductExists, readProductsFile} = require('./validation')
const app =express()
const port = 3000
const fs = require('fs').promises
const bodyParser = require('body-parser')



app.use(bodyParser.json())


app.post("/create", async (req, res) => {
    const productData =  req.body;

    try {
        validateProduct(productData); 
        const existingProducts = await readProductsFile();
        if (isProductExists(existingProducts, productData.id)) {
          res.status(400).send('Product with the same ID already exists');
          return;
        }
        existingProducts.push(productData);
        await fs.writeFile('products.json', JSON.stringify(existingProducts, null, 2));
        console.log('Product stored successfully');
        res.status(201).send('Product stored successfully');
    } catch (error) {
        console.error('Error storing product:', error);
        res.status(400).send(`Bad Request: ${error.message}`);
    }
});

app.get('/products',  async (req, res) => {
    try {
      // Read data from the products.json file
      const data =  await fs.readFile('products.json', 'utf-8');
  
      // Parse the JSON data
      const products = JSON.parse(data);
        console.log(products)
      // Send the products as a JSON response
      res.status(200).json(products);
    } catch (error) {
      console.error('Error reading the file:', error);
      res.status(500).send('Internal Server Error');
    }
});

app.put("/products/:id", async (req, res) => {
  const productID = parseInt(req.params.id);
  const updatedProductData = req.body;

  try {
      validateProduct(updatedProductData);

      const existingProducts = await readProductsFile();

      const productIndex = existingProducts.findIndex(product => product.id === productID);
      if (productIndex === -1) {
          // If the product with the specified ID is not found
          res.status(404).send('Product not found');
          return;
      }

      existingProducts[productIndex] = { ...existingProducts[productIndex], ...updatedProductData };

      // Write the updated products back to the file
      await fs.writeFile('products.json', JSON.stringify(existingProducts, null, 2));

      console.log('Product updated successfully');
      res.status(200).send('Product updated successfully');
  } catch (error) {
      console.error('Error updating product:', error);
      res.status(400).send(`Bad Request: ${error.message}`);
  }
});


app.delete('/delete', async (req, res) => {
  try {
      const productIdToDelete = parseInt(req.params.id); // Assuming you send the product ID in the request body

      const existingProducts = await readProductsFile();

      const productIndexToDelete = existingProducts.find(product => product.id === productIdToDelete);

      if (productIndexToDelete === -1) {
          res.status(404).send('Product not found');
          return;
      }

      // Remove the product from the array
      existingProducts.splice(productIndexToDelete, 1);

      // Write the updated products back to the file
      await fs.writeFile('products.json', JSON.stringify(existingProducts, null, 2));

      console.log('Product deleted successfully');
      res.status(200).send('Product deleted successfully');
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.patch('/updateQuantity/:id', async (req, res) => {
  try {
      const productIdToUpdate = parseInt(req.params.id);
      const newQuantity = req.body.quantity; // Assuming you send the new quantity in the request body
      const existingProducts = await readProductsFile();


      const productToUpdate = existingProducts.find(product => product.id === productIdToUpdate);

      if (!productToUpdate) {
          res.status(404).send('Product not found');
          return;
      }

      // Update the quantity of the product
      productToUpdate.quantity = newQuantity;

      // Write the updated products back to the file
      await fs.writeFile('products.json', JSON.stringify(existingProducts, null, 2));

      console.log('Product quantity updated successfully');
      res.status(200).send('Product quantity updated successfully');
  } catch (error) {
      console.error('Error updating product quantity:', error);
      res.status(500).send('Internal Server Error');
  }
});



app.listen(port, ()=>console.log('Server has started on', port))

