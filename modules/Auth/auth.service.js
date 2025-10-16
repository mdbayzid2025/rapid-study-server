const jwt = require('jsonwebtoken');
const ApiError = require('../../errors/HttpError');
const User = require('../User/User.model');



const registerUser = async (payload) => {
  // check if user exists
  const existingUser = await User.findOne({email: payload?.email});

  if (existingUser) {
    throw new ApiError(
      400,
      `A user with the identifier '${payload?.email}' already exists. Please use a different email or phone number.`
    );
  }

  const registeredUser = await User.create(payload);
  return registeredUser;
};

const loginUser = async (payload) => {
  if (!payload.email) {
    throw new ApiError(400, 'Email or phone number must be provided');
  }

  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isDeleted) {
    throw new ApiError(404, 'The user is already deleted');
  }

  if (user.status === 'banned') {
    throw new ApiError(403, 'The user account is banned.');
  }

  const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password);
  if (!isPasswordMatched) {
    throw new ApiError(401, 'Incorrect password');
  }

  const jwtPayload = {
    identifier: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret, { expiresIn: '7d' });

  return {
    success: true,
    message: 'Login successful',
    token,
  };
};

module.exports = {
  AuthServices: {registerUser,
  loginUser,}
};
