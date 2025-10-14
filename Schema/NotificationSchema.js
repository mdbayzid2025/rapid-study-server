const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {    
    type: {type: String, required: true},
    title: {type: String, required: true,},
    message: { type: String, },  
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    referanceId: {type: String},
    isRead: { type: Boolean, default: false,},
    createdAt: { type: Date, default: Date.now, },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
