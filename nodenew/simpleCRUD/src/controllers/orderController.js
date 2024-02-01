
const { validateEntity, doesEntityExist, readFile, writeFile } = require('../utils/Validation');
const fs = require('fs').promises;
const filePath = '/Users/mahesh/developer/Nodeprac/nodenew/simpleCRUD/src/data/orders.json';

const OrdertController = {

  async createOrder(req, res) 
  {
    const orderData = req.body; // The order data from the client

   try {
    validateEntity(orderData); // Validate order data based on your schema or requirements

    const orders = await readFile(filePath); // Read existing orders

    // Generate a unique ID for the new order
    const newOrderId = orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1;
    orderData.id = newOrderId; // Assign the generated ID to the new order

    // Check if an order with the same ID already exists (it shouldn't since we're generating a unique ID)
    if (doesEntityExist(orders, orderData.id)) {
      return res.status(400).send('An order with the same ID already exists');
    }

    orders.push(orderData); // Add the new order to the orders array
    await writeFile(filePath, orders); // Write the updated orders back to the file

    console.log('Order created successfully');
    res.status(201).json(orderData); // Respond with the created order data
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).send(`Bad Request: ${error.message}`);
  }
  },

  async getOrder(req, res) {
    const orderId = parseInt(req.query.id);

    try {
        const orders = await readFile(filePath);
        if (orderId) {
            // If an ID is provided, return only the product with that ID
            const order = orders.find(order => order.id === orderId);
            if (!order) {
                return res.status(404).send('Order not found');
            }
            res.status(200).json(order);
        } else {
            // If no ID is provided, return all products
            res.status(200).json(orders);
        }
    } catch (error) {
        console.error('Error reading the file:', error);
        res.status(500).send('Internal Server Error');
    }
},
}
module.exports = OrdertController;
