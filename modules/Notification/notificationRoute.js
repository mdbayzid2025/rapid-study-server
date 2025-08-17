const express = require('express');
const notificationController = require('./notificationController');

const notificationRouter = express.Router();

// Routes for notifications
notificationRouter.post('/',  notificationController.createNotification); // Create a notification
notificationRouter.patch('/:notificationId/read',  notificationController.markNotificationAsRead); // Mark notification as read
notificationRouter.get('/',  notificationController.getUserNotifications); // Get user notifications

module.exports = notificationRouter;
