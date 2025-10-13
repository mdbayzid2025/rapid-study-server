const Assignment = require("../../Schema/AssignmentSchema");
const Subject = require("../../Schema/SubjectSchema");
const calendarService = require("../Calander/calendarService");


class AssignmentService {
  // Create a new assignment
  async createAssignment(data) {
    const assignment = await Assignment.create(data);

    // Optionally: Add assignment ID to subject's assignments array
    await Subject.findByIdAndUpdate(
      data.subject,
      { $push: { assignments: assignment._id } },
      { new: true }
    );

    const assignmentCalanderData = {
        title: "Assignment",
        type: "Assignment",
        item: assignment?._id,
        start: assignment?.submissionDate,
        color: "#830a69ff",
      };      
      await calendarService.createCalendar(assignmentCalanderData);

    return assignment;
  }

  // Get all assignments
  async getAllAssignments() {
    return await Assignment.find()
      .populate("subject")  // Populate subject data
      .sort({ createdAt: -1 });  // Sort by created date (descending)
  }

  // Get an assignment by ID
  async getAssignmentById(id) {
    return await Assignment.findById(id).populate("subject");
  }

  // Update an assignment
  async updateAssignment(id, data) {
    try {
      const updatedAssignment = await Assignment.findByIdAndUpdate(id, data, { new: true });
      return updatedAssignment;
    } catch (error) {
      throw new Error(`Error updating assignment: ${error.message}`);
    }
  }

  // Delete an assignment
  async deleteAssignment(id) {
    try {
      const deletedAssignment = await Assignment.findByIdAndDelete(id);

       await Subject.findByIdAndUpdate(
      deletedAssignment.subject._id,
      { $pull: { assignments: deletedAssignment._id } },
      { new: true }
    );
      return deletedAssignment;
    } catch (error) {
      throw new Error(`Error deleting assignment: ${error.message}`);
    }
  }
}

module.exports = new AssignmentService();
