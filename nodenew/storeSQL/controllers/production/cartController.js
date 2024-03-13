const pool = require('../../config/db'); // Adjust the import path as necessary

const CartController = {
  async addToCart(req, res) {
    const userId = req.params.id;
    const { productId, quantity, price } = req.body;

    try {
      // Since SQL doesn't directly support "upsert" logic within a single query in the same way as document databases,
      // you need to first attempt to insert, and if it fails (e.g., due to a duplicate entry), then update.

      // Assuming 'cart_items' doesn't allow the same product to be added twice for simplicity
      const insertQuery = `
        INSERT INTO cart_items (user_id, product_id, quantity, price) 
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + $3, price = $4
        RETURNING *;
      `;

      const { rows } = await pool.query(insertQuery, [userId, productId, quantity, price]);
      res.json({
        success: true,
        message: "Product added to cart successfully",
        data: rows[0]
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async getCart(req, res) {
    const userId = req.params.id;

    try {
      const selectQuery = `
        SELECT * FROM cart_items WHERE user_id = $1;
      `;

      const { rows } = await pool.query(selectQuery, [userId]);
      if (rows.length === 0) {
        return res.json({
          success: true,
          message: "Cart is empty",
          data: []
        });
      }

      res.json({
        success: true,
        data: rows
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = CartController;
