const QueryBuilder = require("../../utility/QueryBuilder");
const User = require("./User.model");

// Create user
const createUserToDB = async (payload) => {
  const result = await User.create(payload);
  return result;
};

// Get all users
const getAllUsersFromDB = async (query) => {
  const usersQueryBuilder = new QueryBuilder(User.find(), query)
  .search(['name', 'idNo', 'email', 'bloodGroup', 'contact'])
  .filter()
  .sort()
  .fields()
  .paginate()
  // .select('-password');


  const users = await usersQueryBuilder.modelQuery;
  const meta = await usersQueryBuilder.getPaginationInfo()
  return {data:users, meta };
};

// Get single user by ID
const getUserByIdFromDB = async (id) => {
  const result = await User.findById(id).select('-password');
  return result;
};

// Update user info
const updateUserToDB = async (id, payload) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-password');
  return result;
};

// Delete user
const deleteUserFromDB = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

module.exports.UserService = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserToDB,
  deleteUserFromDB,
};
