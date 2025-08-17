const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model, you can change it if necessary
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
