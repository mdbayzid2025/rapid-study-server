const express = require('express');
const noticeController = require('./noticeController');
const noticeRouter = express.Router();

// Create a new notice (authentication required)
noticeRouter.post('/create',  noticeController.createNotice);

// Get all notices (authentication optional)
noticeRouter.get('/', noticeController.getAllNotices);

// Get a specific notice by ID (authentication optional)
noticeRouter.get('/:id', noticeController.getNoticeById);

// Delete a notice by ID (authentication required)
noticeRouter.delete('/:id',  noticeController.deleteNotice);

module.exports = noticeRouter;
