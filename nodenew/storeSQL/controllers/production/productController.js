const pool = require('../../config/db'); // Adjust the import path as necessary

const ProductController = {
    async createProduct(req, res) {
        const { name, description, price, stock_quantity } = req.body;
        const query = `
            INSERT INTO products (name, description, price, stock_quantity) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;

        try {
            const { rows } = await pool.query(query, [name, description, price, stock_quantity]);
            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: rows[0]
            });
        } catch (error) {
            console.error('Error in creating product:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    async getProducts(req, res) {
        const productId = req.query.id;
        let query = `SELECT * FROM products`;
        let queryParams = [];

        if (productId) {
            query += ` WHERE id = $1`;
            queryParams.push(productId);
        }

        try {
            const { rows } = await pool.query(query, queryParams);
            const message = productId ? "1 product fetched" : `${rows.length} products fetched`;
            res.status(200).json({
                success: true,
                message: message,
                data: rows
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    async updateProduct(req, res) {
        const productId = req.params.id;
        const { name, description, price, stock_quantity } = req.body;
        const query = `
            UPDATE products 
            SET name = $1, description = $2, price = $3, stock_quantity = $4
            WHERE id = $5 
            RETURNING *;
        `;

        try {
            const { rows } = await pool.query(query, [name, description, price, stock_quantity, productId]);
            if (rows.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Product updated successfully",
                    data: rows[0]
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    async deleteProduct(req, res) {
        const productId = req.params.id;
        const query = `DELETE FROM products WHERE id = $1`;

        try {
            const { rowCount } = await pool.query(query, [productId]);
            if (rowCount > 0) {
                res.status(200).json({
                    success: true,
                    message: "Product deleted successfully"
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },


    async updateQuantity(req, res) {
        const productId = req.params.id;
        const { quantity } = req.body; 
        const query = `
            UPDATE products 
            SET stock_quantity = $1 
            WHERE id = $2 
            RETURNING *;
        `;

        try {
            const { rows } = await pool.query(query, [quantity, productId]);
            if (rows.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Product quantity updated successfully",
                    data: rows[0]
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
        } catch (error) {
            console.error('Error in updating product quantity:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = ProductController;
