const jwt = require('jsonwebtoken');
const ApiError = require('../../errors/HttpError');
const User = require('../User/User.model');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const { jwt_access_secret } = require('../../config');


const registerUser = async (payload) => {
  const { email, password, role } = payload;

  // 1️⃣ Check if email provided
  if (!email) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is required');
  }

  // 2️⃣ Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `A user with the email '${email}' already exists. Please use a different email.`
    );
  }

  // 3️⃣ Hash password (same as pre-save hook logic)
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // 4️⃣ Create user
  const newUser = await User.create({
    ...payload,
    password: hashedPassword,
  });

  // 5️⃣ Generate token
  const jwtPayload = {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = jwt.sign(jwtPayload, jwt_access_secret, { expiresIn: '7d' });

  // 6️⃣ Return consistent response
  return {    
    data: {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      accessToken
    },
  };
};

const loginUser = async (payload) => {
  const { email, password } = payload;

  // 1️⃣ Check if email provided
  if (!email) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email must be provided');
  }

  // 2️⃣ Find user
  const user = await User.findOne({ email }).select('+password');  
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.isDeleted) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'The user is already deleted');
  }

  if (user.status === 'banned') {
    throw new ApiError(StatusCodes.FORBIDDEN, 'The user account is banned');
  }

  console.log('password', user?.password)
  
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password');
  }

  // 5️⃣ Prepare JWT payload
  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  // 6️⃣ Generate token
  const token = jwt.sign(jwtPayload, jwt_access_secret, { expiresIn: '7d' });

  // 7️⃣ Return consistent response
  return {    
    data: {
      id: user._id,
      email: user.email,
      role: user.role,
      accessToken: token
    },
  };
};
module.exports = {
  AuthServices: {registerUser,
  loginUser,}
};
