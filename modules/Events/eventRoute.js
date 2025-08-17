const express = require('express');
const eventController = require('./eventController');

const eventRouter = express.Router();

// Create a new event
eventRouter.post('/', eventController.createEvent);

// Get all events
eventRouter.get('/', eventController.getAllEvents);

// Get a specific event by ID
eventRouter.get('/:id', eventController.getEventById);

// Update an event
eventRouter.patch('/:id', eventController.updateEvent);

// Delete an event
eventRouter.delete('/:id', eventController.deleteEvent);

module.exports = eventRouter;
