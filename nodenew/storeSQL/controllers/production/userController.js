const pool = require('../../config/db'); 
const jwt = require('jsonwebtoken');
const {infoLogger, errorLogger} = require('../../config/logger')
require('dotenv').config();


const UserController = {
    async createUser(req, res) {
        const { username, email, password } = req.body;
        const query = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;

        try {
            const { rows } = await pool.query(query, [username, email, password]);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: rows[0]
            });
            infoLogger.info(`User ${username} created successfully.`);

        } catch (error) {
            errorLogger.error('Error in creating user:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    async login(req, res) {
        const { email, password } = req.body;
    
        const query = `SELECT * FROM users WHERE email = $1`;
    
        try {
            const { rows } = await pool.query(query, [email]);
            if (rows.length > 0) {
                const user = rows[0];
    
                if (password === user.password) {
                    // User authenticated successfully, generate a JWT
                    const token = jwt.sign(
                        { userId: user.id, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' } // Token expires in 24 hours
                    );
    
                    infoLogger.info(`User ${email} logged in.`);
                    return res.json({
                        success: true,
                        message: "Logged in successfully",
                        token: token,
                        userId: user.id
                    });
                } else {
                    // Passwords do not match
                    errorLogger.error(`Invalid credentials for user ${email}.`);
                    return res.status(400).json({
                        success: false,
                        message: "Invalid credentials"
                    });
                }
            } else {
                // User not found
                errorLogger.error(`Login attempt for non-existing user ${email}.`);
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
        } catch (error) {
            logger.error(`Error logging in user ${email}: ${error.message}`);
            return res.status(500).json({
                success: false,
                message: "An error occurred during the login process."
            });
        }
    },
    async getUser(req, res) {
        const userId = req.query.id;
        try {
            if (userId) {
                const query = `SELECT * FROM users WHERE id = $1`;
                const { rows } = await pool.query(query, [userId]);
                res.status(200).json({
                    success: true,
                    message: "1 user fetched",
                    data: rows[0]
                });
            } else {
                const query = `SELECT * FROM users`;
                const { rows } = await pool.query(query);
                res.status(200).json({
                    success: true,
                    message: `${rows.length} users fetched`,
                    data: rows
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    async updateUser(req, res) {
        const userId = req.params.id;
        const { username, email, password } = req.body;
        const query = `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`;

        try {
            const { rows } = await pool.query(query, [username, email, password, userId]);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: rows[0]
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    async deleteUser(req, res) {
        const userId = req.params.id;
        const query = `DELETE FROM users WHERE id = $1`;

        try {
            await pool.query(query, [userId]);
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = UserController;
