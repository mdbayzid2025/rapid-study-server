// controllers/calendarController.js

const calendarService = require("./calendarService");

class CalendarController {
  // Create a new calendar event
  async createEvent(req, res) {
    try {
      const { title, start, end, allDay, color } = req.body;
      const newEvent = await calendarService.createEvent({ title, start, end, allDay, color });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all calendar events
  async getEvents(req, res) {
    try {
      const events = await calendarService.getEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a calendar event by its ID
  async deleteEvent(req, res) {
    try {
      const { eventId } = req.params;
      const deletedEvent = await calendarService.deleteEvent(eventId);
      res.status(200).json(deletedEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CalendarController();
