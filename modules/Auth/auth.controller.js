
const { catchAsync } = require('../../shared/catchAsync');
const sendResponse = require('../../shared/sendResponse');
const { AuthServices } = require('./auth.service');

const registerUserController = catchAsync(async (req, res) => {
  const registerUserPayload = req.body;
  const registeredUser = await AuthServices.registerUser(registerUserPayload);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: 201,
    data: registeredUser?.data,
  });
});

const loginUserController = catchAsync(async (req, res) => {
  const loginUserPayload = req.body;
  const loginResult = await AuthServices.loginUser(loginUserPayload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: loginResult?.data,
  });
});

module.exports = {
  AuthControllers: {
    registerUserController,
    loginUserController,
  },
};
