const Notice = require("../../Schema/noticeSchema");

class NoticeService {
  // Create a new notice
   async createNotice(noticeData) {
    try {
      const notice = new Notice(noticeData);
      await notice.save();
      return notice;
    } catch (error) {
      throw new Error('Error creating notice: ' + error.message);
    }
  }

  // Get all notices
   async getAllNotices() {
    try {
      return await Notice.find().populate('postedBy', 'name email').populate('subject', 'title');
    } catch (error) {
      throw new Error('Error fetching notices: ' + error.message);
    }
  }

  // Get a specific notice by ID
   async getNoticeById(id) {
    try {
      return await Notice.findById(id).populate('postedBy', 'name email').populate('subject', 'title');
    } catch (error) {
      throw new Error('Error fetching notice by ID: ' + error.message);
    }
  }

  // Update a notice by ID
   async updateNotice(id, updateData) {
    try {
      const updatedNotice = await Notice.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedNotice) {
        throw new Error('Notice not found');
      }
      return updatedNotice;
    } catch (error) {
      throw new Error('Error updating notice: ' + error.message);
    }
  }

  // Delete a notice by ID
   async deleteNotice(id) {
    try {
      const deletedNotice = await Notice.findByIdAndDelete(id);
      if (!deletedNotice) {
        throw new Error('Notice not found');
      }
      return deletedNotice;
    } catch (error) {
      throw new Error('Error deleting notice: ' + error.message);
    }
  }

  // Send an update notification when a notice is updated
   sendUpdateNotification(updatedNotice) {
    // Logic for sending a notification (e.g., email, system message, etc.)
    // For simplicity, we just log the notification
    console.log(`Notice #${updatedNotice.serialNo} has been updated. New title: "${updatedNotice.title}"`);
    // You can extend this with actual notification systems (like email, SMS, etc.)
  }
}

module.exports = NoticeService;
