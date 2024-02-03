const { Cart } = require("../../models/model");


const CartController = {

async addToCart (req, res) {
  try {
    const userId = req.params.id;
    const { productId, quantity, price } = req.body;
    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      // if user has a cart, push new items
      existingCart.items.push({ productId, quantity, price });
      await existingCart.save();
    } else {
      // if user doesnt have, make one
      await Cart.create({
        userId,
        items: [{ productId, quantity, price }],
      });
    }

    res.json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
},

async getCart (req, res){
  try {

    const userId = req.params.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json([]);
    }

    res.json({ success: true, data: cart.items });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}
}

module.exports  = CartController