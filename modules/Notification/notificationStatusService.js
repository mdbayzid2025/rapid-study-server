// notificationService.js
const NotificationStatus = require('./notificationStatus.model');

// Service to mark all unread notifications as read for a specific user
async function markAllAsRead(userId) {
  try {
    const result = await NotificationStatus.updateMany(
      { userId, read: false }, // Find unread notifications for this user
      { $set: { read: true } }  // Set read to true for those notifications
    );
    return result;
  } catch (error) {
    throw new Error('Error marking notifications as read');
  }
}

module.exports = {
  markAllAsRead,
};
