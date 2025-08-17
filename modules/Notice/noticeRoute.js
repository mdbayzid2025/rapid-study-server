const express = require('express');
const noticeController = require('./noticeController');
const router = express.Router();

// Create a new notice (authentication required)
router.post('/create',  noticeController.createNotice);

// Get all notices (authentication optional)
router.get('/', noticeController.getAllNotices);

// Get a specific notice by ID (authentication optional)
router.get('/:id', noticeController.getNoticeById);

// Delete a notice by ID (authentication required)
router.delete('/:id',  noticeController.deleteNotice);

module.exports = router;
