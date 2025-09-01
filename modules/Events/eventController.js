const { AddCalanderSchedule } = require("../../helper/AddCalanderSchedule");
const { default: generateNotificationMessage } = require("../../helper/generateNotificationMessage");
const CalenderSchema = require("../../Schema/CalenderSchema");
const notificationService = require("../Notification/notificationService");
const eventService = require("./eventService");

class EventController {
  // Create a new event
  async createEvent(req, res) {
    try {
      const event = await eventService.createEvent(req.body);

      const notificationData = generateNotificationMessage("event", event);
      const data = {
        title: "Event",
        eventId: event?._id,
        start: event?.date,
        color: "#3174ad"
      }
      await CalenderSchema(data);

      await notificationService.createNotification({
        ...notificationData,
        read: false,
      });

      return res
        .status(201)
        .json({ success: true, message: "Event created", data: event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Get all events
  async getAllEvents(req, res) {
    try {
      const events = await eventService.getAllEvents();
      return res.status(200).json({ success: true, data: events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Get a specific event by ID
  async getEventById(req, res) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      }
      return res.status(200).json({ success: true, data: event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Update an event
  async updateEvent(req, res) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);
      if (!event) {
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Event updated", data: event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Delete an event
  async deleteEvent(req, res) {
    try {
      const deleted = await eventService.deleteEvent(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      }
      return res.status(200).json({ success: true, message: "Event deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }
}

module.exports = new EventController();
