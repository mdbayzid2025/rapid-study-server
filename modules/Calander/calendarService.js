
const CalanderSchema = require("../../Schema/CalenderSchema");

class CalendarService {
  // Create a new calendar event
  async createEvent(data) {
    try {
      const event = new CalanderSchema(data);
      await event.save();
      return event;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Error creating event');
    }
  }

  // Get all calendar events
  async getEvents() {
    try {
      return await CalanderSchema.find();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Error fetching events');
    }
  }

  // Delete a calendar event by its ID
  async deleteEvent(eventId) {
    try {
      const event = await CalanderSchema.findByIdAndDelete(eventId);
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Error deleting event');
    }
  }
}

module.exports = new CalendarService();
