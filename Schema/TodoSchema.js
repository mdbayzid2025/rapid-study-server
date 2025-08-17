const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  startDate: {
    type: Date,
    required: true, // Start date is required
  },
  endDate: {
    type: Date,
    required: true, // End date is required
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', // Reference to the Subject model
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'], // Priority levels
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Working', 'Done'], // Status options
    default: 'Pending', // Default to Pending
  }
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

const ToDo = mongoose.model('Todo', todoSchema);

module.exports = ToDo;
