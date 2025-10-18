const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    idNo: {
      type: String,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // hide password by default in queries
    },
    profession: {
      type: String,
      trim: true,
    },
    address: {
      type: {
        area: { type: String, trim: true },
        upazilla: { type: String, trim: true },
        thana: { type: String, trim: true },
      },
      _id: false,
      default: {},
    },
    district: {
      type: String,
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    emergencyContact: {
      type: {
        name: { type: String, trim: true },
        relation: { type: String, trim: true },
        mobile: { type: String, trim: true },
        address: { type: String, trim: true },
      },
      _id: false,
      default: {},
    },
    profileImage: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    versionKey: false, // removes __v
  }
);

// 🔐 Compare plain password with hashed password
userSchema.statics.isMatchPassword = async function (password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
};

// 🧩 Check duplicate email and hash password before saving
userSchema.pre('save', async function (next) {
  const User = this.constructor; // Access model dynamically

  // Check if email already exists
  const isExist = await User.findOne({ email: this.email });
  if (isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exists!');
  }

  // Hash password
  this.password = await bcrypt.hash(
    this.password,
    10
  );

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
