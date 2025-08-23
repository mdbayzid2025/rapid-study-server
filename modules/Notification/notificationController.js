const Assignment = require("../../Schema/AssignmentSchema");
const Note = require("../../Schema/NoteSchema");
const Notice = require("../../Schema/noticeSchema");
const ToDo = require("../../Schema/TodoSchema");
const notificationService = require("./notificationService");

class NotificationController {

    // --------------- Dashboard Stats -------------
  
  async getDashboardStats(req, res) {
  try {
    // Total ToDos (Tasks)
    const totalTasks = await ToDo.countDocuments();

    // Pending Assignments (assuming there's a 'status' field like 'pending', 'completed', etc.)
    const pendingAssignments = await Assignment.countDocuments({ status: 'pending' });

    // Total Notes
    const totalNotes = await Note.countDocuments();

    // Active Notices (assuming there's an 'active' boolean or filter condition)
    const activeNotices = await Notice.countDocuments();

    // Construct stats array
    const stats = [
      { label: 'Total Tasks', value: totalTasks.toString(), color: 'bg-blue-50 text-blue-600', icon: '📋' },
      { label: 'Upcoming Assignments', value: pendingAssignments.toString(), color: 'bg-orange-50 text-orange-600', icon: '📚' },
      { label: 'Notes Added', value: totalNotes.toString(), color: 'bg-green-50 text-green-600', icon: '📝' },
      { label: 'Active Notices', value: activeNotices.toString(), color: 'bg-purple-50 text-purple-600', icon: '🔔' }
    ];

    return res.status(200).json({
      success: true,
      message: 'Dashboard stats fetched successfully',
      data: stats
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error
    });
  }
}



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
