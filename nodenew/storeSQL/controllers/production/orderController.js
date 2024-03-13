const pool = require('../../config/db'); // Adjust the import path as necessary

const OrderController = {
    async checkOut(req, res) {
        const userId = parseInt(req.params.id);
        const selectCartQuery = `SELECT * FROM cart_items WHERE user_id = $1`;

        try {
            const { rows: cartItems } = await pool.query(selectCartQuery, [userId]);
            if (cartItems.length === 0) {
                return res.json({ success: false, message: "Cart is empty" });
            }

            const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const minimumThreshold = 100;
            if (totalPrice < minimumThreshold) {
                return res.json({
                    success: false,
                    message: `Total price must be at least $${minimumThreshold} in order to checkout.`,
                });
            }

            // Begin transaction
            await pool.query('BEGIN');

            const insertOrderQuery = `
                INSERT INTO orders (user_id, total_price, date)
                VALUES ($1, $2, NOW())
                RETURNING id;
            `;
            const { rows: orderRows } = await pool.query(insertOrderQuery, [userId, totalPrice]);
            const orderId = orderRows[0].id;

            const insertOrderItemsQuery = `
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES ${cartItems.map((_, index) => `($1, $${index * 3 + 2}, $${index * 3 + 3}, $${index * 3 + 4})`).join(', ')}
                RETURNING *;
            `;
            const orderItemsValues = cartItems.flatMap(item => [orderId, item.product_id, item.quantity, item.price]);
            await pool.query(insertOrderItemsQuery, [orderId, ...orderItemsValues]);

            // Clear the cart
            const clearCartQuery = `DELETE FROM cart_items WHERE user_id = $1`;
            await pool.query(clearCartQuery, [userId]);

            // Commit transaction
            await pool.query('COMMIT');

            res.json({
                success: true,
                message: "Order placed successfully",
                data: { orderId, items: cartItems, total_price: totalPrice }
            });
        } catch (error) {
            await pool.query('ROLLBACK'); // Rollback transaction on error
            console.error('Error in checkout:', error);
            res.json({ success: false, error: error.message });
        }
    },

    async getOrders(req, res) {
        const userId = parseInt(req.query.user_id); // Assuming you're fetching orders by user ID
        let query = `SELECT * FROM orders WHERE user_id = $1`;
        let queryParams = [userId];

        try {
            const { rows: orders } = await pool.query(query, queryParams);
            if (orders.length > 0) {
                // Optionally, fetch order items for each order here
            }
            res.json({
                success: true,
                message: `${orders.length} orders fetched`,
                data: orders
            });
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.json({ success: false, error: error.message });
        }
    }
};

module.exports = OrderController;
