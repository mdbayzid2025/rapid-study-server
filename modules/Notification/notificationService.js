const Notification = require("../../Schema/NotificationSchema");
const QueryBuilder = require("../../utility/QueryBuilder");

class NotificationService {
  // Create a new notification
  async createNotification(data) {
    try {
      const notification = new Notification(data);

      await notification.save();
      return notification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new Error("Error creating notification");
    }
  }

  async markAllAsRead(userId) {
    try {
      const result = await Notification.updateMany(
        { userId, read: false },
        { $set: { read: true } }
      );
      return result;
    } catch (error) {
      throw new Error("Error marking notifications as read");
    }
  }

  async getAllNotifications(query, user) {
    try {
      const notificationQueryBuilder = new QueryBuilder(Notification.find({receiver: user.id}), query)
        .paginate()
        .filter()
        .sort()
        .paginate()
        .fields();
      // const result = await Notification.find();

      const notifications = await notificationQueryBuilder.modelQuery;
      const meta = await notificationQueryBuilder.getPaginationInfo();
      return { data: notifications, meta };
    } catch (error) {
      throw new Error("Error marking notifications as read", error);
    }
  }

  async getNotifications(userId) {
    try {
      const notifications = await Notification.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: "notifications",
            localField: "notificationId",
            foreignField: "_id",
            as: "notificationDetails",
          },
        },
        { $unwind: "$notificationDetails" },
        {
          $project: {
            "notificationDetails.title": 1,
            "notificationDetails.message": 1,
            "notificationDetails.createdAt": 1,
            read: 1,
          },
        },
      ]);
      return notifications.map((item) => item.notificationDetails);
    } catch (error) {
      throw new Error("Error fetching notifications");
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
