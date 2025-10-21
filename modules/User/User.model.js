const mongoose = require('mongoose');

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
    role: {type: String, default: 'USER', enum: ['USER', 'SUPER_ADMIN', 'ADMIN']},
    address: {
      type: {
        area: { type: String, trim: true },        
        thana: { type: String, trim: true },
        district: { type: String, trim: true },
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


const User = mongoose.model('User', userSchema);

module.exports = User;
