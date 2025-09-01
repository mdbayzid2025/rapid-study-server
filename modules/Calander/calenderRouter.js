// routes/calendarRoutes.js

const express = require('express');

const calendarRouter = express.Router();
const calendarController = require('./calendarController');


// Routes for calendar events
calendarRouter.post('/', calendarController.createEvent); // Create a calendar event
calendarRouter.get('/', calendarController.getEvents); // Get all calendar events
calendarRouter.delete('/:eventId', calendarController.deleteEvent); // Delete a calendar event

module.exports = calendarRouter;
