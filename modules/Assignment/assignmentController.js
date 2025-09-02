const calendarService = require("../Calander/calendarService");
const assignmentService = require("./assignmentService");

class AssignmentController {
  // Create a new assignment
  async createAssignment(req, res) {
    try {
      const assignment = await assignmentService.createAssignment(req.body);
      const data = {
        title: "Assignment",
        eventId: assignment?._id,
        start: assignment?.submissionDate,
        color: "#830a69ff",
      };
      await calendarService.createCalendar(data);
      return res
        .status(201)
        .json({
          success: true,
          message: "Assignment created",
          data: assignment,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Get all assignments
  async getAllAssignments(req, res) {
    try {
      const assignments = await assignmentService.getAllAssignments();
      return res.status(200).json({ success: true, data: assignments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Get a specific assignment by ID
  async getAssignmentById(req, res) {
    try {
      const assignment = await assignmentService.getAssignmentById(
        req.params.id
      );
      if (!assignment) {
        return res
          .status(404)
          .json({ success: false, message: "Assignment not found" });
      }
      return res.status(200).json({ success: true, data: assignment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Update an assignment
  async updateAssignment(req, res) {
    try {
      const assignment = await assignmentService.updateAssignment(
        req.params.id,
        req.body
      );
      if (!assignment) {
        return res
          .status(404)
          .json({ success: false, message: "Assignment not found" });
      }
      return res
        .status(200)
        .json({
          success: true,
          message: "Assignment updated",
          data: assignment,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Delete an assignment
  async deleteAssignment(req, res) {
    try {
      const deleted = await assignmentService.deleteAssignment(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Assignment not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Assignment deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }
}

module.exports = new AssignmentController();
