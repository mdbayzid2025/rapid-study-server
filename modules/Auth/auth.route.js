// auth.route.js
const express = require('express');
const { AuthControllers } = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/register', AuthControllers.registerUserController);
authRouter.post('/login', AuthControllers.loginUserController);

module.exports = { AuthRoutes: authRouter };