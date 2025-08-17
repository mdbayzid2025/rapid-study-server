const Event = require("../../Schema/eventsSchema");
const Subject = require("../../Schema/SubjectSchema");


class EventService {
  // Create a new event
  async createEvent(data) {
    // 1. Create the event
    const event = await Event.create(data);

    // 2. If a subject is provided, push the event ID to the subject's events array
    if (data?.subject) {
      await Subject.findByIdAndUpdate(
        data.subject, // subject ID from request
        { $push: { events: event._id } }, // Add event ID to subject's events array
        { new: true }
      );
    }

    // 3. Return the created event
    return event;
  }

  // Get all events
  async getAllEvents() {
    return await Event.find()
      .populate("subject")  // Optionally populate subject data
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
      const updatedEvent = await Event.findByIdAndUpdate(id, data, { new: true });
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
