const express = require('express');
const notificationController = require('./notificationController');

const notificationRouter = express.Router();

// Routes for notifications
notificationRouter.post('/',  notificationController.createNotification); // Create a notification
notificationRouter.patch('/:notificationId/read',  notificationController.markNotificationAsRead); // Mark notification as read

// notificationRouter.get('/',  notificationController.getNotifications); // Get user notifications
notificationRouter.post('/:userId/mark-all-read', notificationController.markAllAsRead);
notificationRouter.get('/notifications/:userId', notificationController.getNotifications);
notificationRouter.get('/stats', notificationController.getDashboardStats);

module.exports = notificationRouter;
