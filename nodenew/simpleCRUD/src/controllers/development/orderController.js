const { readFile, writeFile } = require('../../utils/Validation');
const filePath = '/Users/mahesh/developer/Nodeprac/nodenew/simpleCRUD/src/data/orders.json';
const cartFilePath = '/Users/mahesh/developer/Nodeprac/nodenew/simpleCRUD/src/data/carts.json';

const OrderController = {
async checkOut(req, res) {
  try {
    const userId = req.params.id;
    const carts = await readFile(cartFilePath);
    const cart = carts.find(cart => cart.userId === userId);

    if (!cart || cart.items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const minimumThreshold = 100;
    if (totalPrice < minimumThreshold) {
      return res.json({
        success: false,
        message: `Total price must be at least $${minimumThreshold} to checkout.`,
      });
    }

    const orders = await readFile(filePath);
    const order = {
      userId,
      items: cart.items,
      totalPrice,
      date: new Date().toISOString(),
    };
    orders.push(order);
    await writeFile(orders, filePath);

    // Clear the user's cart after placing the order
    const updatedCarts = carts.filter(c => c.userId !== userId);
    updatedCarts.push({ userId, items: [] }); // Re-add the user's cart, now empty
    await writeFile(updatedCarts, cartFilePath);

    res.json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ success: false, error: error.message });
  }
},

async getOrders(req, res) {
  try {
    const orderId = req.query.id;
    const orders = await readFile(filePath);

    if (orderId) {
      const order = orders.find(order => order.id === orderId); // Ensure orders have an 'id' property
      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
      res.status(200).json({ success: true, message: "1 order fetched", data: order });
    } else {
      res.status(200).json({ success: true, message: `${orders.length} orders fetched`, data: orders });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

}

module.exports = OrderController