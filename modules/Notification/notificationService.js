const Notification = require("../../Schema/NotificationSchema");


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

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const notification = await Notification.findById(notificationId);
      if (notification) {
        notification.read = true;
        await notification.save();
        return notification;
      }
      throw new Error('Notification not found');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('Error marking notification as read');
    }
  }


  // Get notifications for a user
  async getUserNotifications() {
    try {
      return await Notification.find()
        .sort({ createdAt: -1 })        
    } catch (error) {
      console.error('Error fetching notifications:', error);
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
