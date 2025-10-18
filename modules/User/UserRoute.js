const express = require('express');
const { UserController } = require('./UserController');
const auth = require('../../middleware/authMiddleware');

const UserRoutes = express.Router();

UserRoutes.post('/', UserController.createUser);
UserRoutes.get('/', auth(), UserController.getAllUsers);
UserRoutes.get('/:id', auth(), UserController.getUserById);
UserRoutes.patch('/:id', auth(), UserController.updateUser);
UserRoutes.delete('/:id', auth(), UserController.deleteUser);

module.exports = UserRoutes;
