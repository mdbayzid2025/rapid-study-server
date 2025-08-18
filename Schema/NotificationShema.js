// notificationStatus.model.js (No change)
const mongoose = require('mongoose');

const notificationStatusSchema = new mongoose.Schema(
  {
    notificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notification',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

notificationStatusSchema.index({ userId: 1, notificationId: 1 });

const NotificationStatus = mongoose.model('NotificationStatus', notificationStatusSchema);
module.exports = NotificationStatus;
