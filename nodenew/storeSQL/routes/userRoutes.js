const express = require('express');
const authenticateToken = require('../middlewares/authentication');
const router = express.Router();
require('dotenv').config();

const environment = process.env.NODE_ENV ;

const UserController = require(`../controllers/${environment}/userController`);

/**
 * @swagger
 * /users:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPayload' 
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Error creating user
 */
router.post('/',authenticateToken, UserController.createUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Login failed
 */
router.post('/login', UserController.login)

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieves all users or a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         required: false
 *         description: Optional user ID to retrieve a single user
 *     responses:
 *       200:
 *         description: A list of users, or a single user if ID is provided
 *       401:
 *         description: Unauthorized
 */

router.get('/', UserController.getUser);


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPayload' 
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */

router.put('/:id', authenticateToken, UserController.updateUser)


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', authenticateToken, UserController.deleteUser);



/**
 * @swagger
 * components:
 *   schemas:
 * 
 *     UserPayload:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 * 
 *       example:
 *         username: Ram bahadur
 *         email: ram.bahadur@example.com
 *         password: 123456
 */

module.exports = router;
