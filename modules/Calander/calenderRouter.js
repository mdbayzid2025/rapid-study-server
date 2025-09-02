// routes/calendarRoutes.js

const express = require('express');

const calendarRouter = express.Router();
const calendarController = require('./calendarController');


// Routes for calendar events
// calendarRouter.post('/', calendarController.createEvent);
calendarRouter.get('/', calendarController.getCalendarData);
// calendarRouter.delete('/:eventId', calendarController.deleteEvent);

module.exports = calendarRouter;
