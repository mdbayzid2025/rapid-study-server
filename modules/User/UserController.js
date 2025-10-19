const { catchAsync } = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const { UserService } = require("./UserService");

// Create User
const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUserToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User created successfully',
    data: result?.data,
  });
});

// Get all Users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All users retrieved successfully',
    data: result?.data,
    pagination: result?.meta
  });
});

// Get single User
const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getUserByIdFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User retrieved successfully',
    data: result,
  });
});


// Get single User
const getProfileData = catchAsync(async (req, res) => {
  
  const result = await UserService.getProfileFromDB(req.user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User retrieved successfully',
    data: result,
  });
});

// Update User
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateUserToDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 203,
    message: 'User updated successfully',
    data: result,
  });
});

// Update User
const updateProfile = catchAsync(async (req, res) => {
  
  const result = await UserService.updateProfileToDB(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: 203,
    message: 'User updated successfully',
    data: result,
  });
});

// Delete User
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUserFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User deleted successfully',
    data: result,
  });
});

module.exports.UserController = {
  createUser,
  getAllUsers,
  getUserById,
  getProfileData,
  updateUser,
  updateProfile,
  deleteUser,
};
