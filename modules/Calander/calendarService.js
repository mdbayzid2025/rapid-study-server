const CalendarSchema = require("../../Schema/CalenderSchema");

class CalendarService {
  // Create a new calendar event
  async createCalendar(data) {
    try {
      const calendar = new CalendarSchema(data);
      await calendar.save();
      return calendar;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Error creating calendar event');
    }
  }

  // Get all calendar events
  async getCalendars() {
    try {
      return await CalendarSchema.find();
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw new Error('Error fetching calendar events');
    }
  }

  // Delete a calendar event by its ID
  async deleteCalendar(calendarId) {
    try {
      const calendar = await CalendarSchema.findByIdAndDelete(calendarId);
      if (!calendar) {
        throw new Error('Calendar event not found');
      }
      return calendar;
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw new Error('Error deleting calendar event');
    }
  }
}

module.exports = new CalendarService();
