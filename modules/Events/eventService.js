const { sendNotifications } = require("../../helper/notificationHelper");
const Event = require("../../Schema/eventsSchema");
const Subject = require("../../Schema/SubjectSchema");
const calendarService = require("../Calander/calendarService");

class EventService {
  // Create a new event
  async createEvent(data) {
    const event = await Event.create(data);

    const subject = await Subject.findByIdAndUpdate(
      data.subject,
      { $push: { events: event._id } },
      { new: true }
    ).select("name");

    const eventCalanderData = {
      title: "Event",
      type: "Event",
      start: event?.date,
      item: event?._id,
      color: "#003877",
    };
    await calendarService.createCalendar(eventCalanderData);

    sendNotifications({
      title: "Scheduled new event",
      message: `Add new event of <b>${subject?.name}</b>.`,
      receiver: '68dcfbd20fa1a936d5ce1c39',
      type: "Event",
      read: false,
      reference: subject._id,
    });
    return event;
  }

  // Get all events
  async getAllEvents() {
    return await Event.find()
      .populate("subject") // Optionally populate subject data
      .sort({ createdAt: -1 }); // Sort events by created date
  }

  // Get a specific event by ID
  async getEventById(id) {
    return await Event.findById(id).populate("subject");
  }

  // Update an event
  async updateEvent(id, data) {
    try {
      // 1. Update the event with new data
      const updatedEvent = await Event.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedEvent; // Return the updated event
    } catch (error) {
      throw new Error(`Error updating event: ${error.message}`);
    }
  }

  // Delete an event
  async deleteEvent(id) {
    try {
      // 1. Delete the event by ID
      return await Event.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting event: ${error.message}`);
    }
  }
}

module.exports = new EventService();
