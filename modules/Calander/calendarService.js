const CalendarSchema = require("../../Schema/CalenderSchema");

class CalendarService {
  // Create a new calendar event
  async createCalendar(data) {
    console.log("Calendar data:", data);
    try {
      const calendar = new CalendarSchema({...data, type: data?.title });
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

  // Get all calendar events
  async getScheduledEventsById(id) {
    try {
      return await CalendarSchema.findById(id )
      .populate({
      path: 'item',
      populate: {
        path: 'subject',
        select: 'name code teacher', // ✅ include only useful fields
      },
    }).lean();
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw new Error('Error fetching calendar events');
    }
  }


  async getSingleCalendar(calendarId) {
    try {
      const calendar = await CalendarSchema.findById(calendarId);
      if (!calendar) {
        throw new Error('Calendar event not found');
      }
      return calendar;
    } catch (error) {
      console.error('Error fetching calendar event:', error);
      throw new Error('Error fetching calendar event');
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
