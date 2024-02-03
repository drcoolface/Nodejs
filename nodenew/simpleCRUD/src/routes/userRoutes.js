const express = require('express');
const router = express.Router();
require('dotenv').config();

const environment = process.env.NODE_ENV ;

const UserController = require(`../controllers/${environment}/userController`);

router.post('/', UserController.createUser)
router.get('/', UserController.getUser);

router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser);


module.exports = router;
