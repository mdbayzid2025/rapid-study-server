const notificationService = require("./notificationService");


class NotificationController {
  // Create a new notification
  async createNotification(req, res) {
    try {            
        console.log("notification", req.body);
        
      const notification = await notificationService.createNotification(req.body);

      return res.status(201).json({
        success: true,
        message: 'Notification created successfully',
        data: notification,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error', error });
    }
  }

  // Mark notification as read
  async markNotificationAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      const notification = await notificationService.markAsRead(notificationId);
      return res.status(200).json({
        success: true,
        message: 'Notification marked as read',
        data: notification,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error', error });
    }
  }

  // Get notifications for the user
  async getUserNotifications(req, res) {
    try {      
      const notifications = await notificationService.getUserNotifications();
      return res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error', error });
    }
  }
}

module.exports = new NotificationController();
