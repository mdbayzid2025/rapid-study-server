const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {    
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,      
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

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
