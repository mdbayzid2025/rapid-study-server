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

  async markAllAsRead(req, res) {
  try {
    const { userId } = req.params; // Get userId from the request params

    // Call the service to mark notifications as read
    const result = await notificationService.markAllAsRead(userId);

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        success: true,
        message: 'All notifications marked as read',
        data: result,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'No unread notifications found',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
}

  // Mark notification as read
  async markNotificationAsRead(req, res) {
    try {      
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

async getNotifications(req, res) {
  try {
    const { userId } = req.params; // Get the userId from request params

    // Call the service to get notifications for this user
    const notifications = await notificationService.getNotifications(userId);

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
