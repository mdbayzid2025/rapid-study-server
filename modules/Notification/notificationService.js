const Notification = require("../../Schema/NotificationSchema");
const NotificationStatus = require("../../Schema/NotificationShema");


class NotificationService {
  // Create a new notification
  async createNotification(data) {
    try {
      const notification = new Notification(data);

      await notification.save();
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new Error('Error creating notification');
    }
  }

  async markAllAsRead(userId) {
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

async getNotifications(userId) {
  try {
    // Find all notifications that are associated with the user
    const notifications = await NotificationStatus.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'notifications', // Join with the notifications collection
          localField: 'notificationId',
          foreignField: '_id',
          as: 'notificationDetails',
        },
      },
      { $unwind: '$notificationDetails' }, // Flatten the notification details
      { $project: { 'notificationDetails.title': 1, 'notificationDetails.message': 1, 'notificationDetails.createdAt': 1, read: 1 } },
    ]);
    return notifications.map(item => item.notificationDetails);
  } catch (error) {
    throw new Error('Error fetching notifications');
  }
}

    // Delete an event
  async deleteNotifications(id) {
    try {
      // 1. Delete the event by ID
      return await Notification.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting event: ${error.message}`);
    }
  }
}

module.exports = new NotificationService();
