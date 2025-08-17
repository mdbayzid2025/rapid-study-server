const noticeService = require('./noticeService');

// Create a new notice
const createNotice = async (req, res) => {
  try {
    const noticeData = {
      title: req.body.title,
      content: req.body.content,
      subject: req.body.subject,  // Subject ID passed in request body
      postedBy: req.user._id,     // Assuming user is authenticated and `req.user` is populated
    };
    const newNotice = await noticeService.createNotice(noticeData);
    res.status(201).json({
      message: 'Notice created successfully',
      notice: newNotice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await noticeService.getAllNotices();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific notice by ID
const getNoticeById = async (req, res) => {
  try {
    const notice = await noticeService.getNoticeById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a notice by ID
const deleteNotice = async (req, res) => {
  try {
    const notice = await noticeService.deleteNotice(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNotice,
  getAllNotices,
  getNoticeById,
  deleteNotice,
};
