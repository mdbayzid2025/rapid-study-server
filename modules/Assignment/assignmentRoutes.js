const express = require('express');
const assignmentController = require("./assignmentController");
const assignmentRouter = express.Router();

// Create a new assignment
assignmentRouter.post('/', assignmentController.createAssignment);

// Get all assignments
assignmentRouter.get('/', assignmentController.getAllAssignments);

// Get a specific assignment by ID
assignmentRouter.get('/:id', assignmentController.getAssignmentById);

// Update an assignment
assignmentRouter.patch('/:id', assignmentController.updateAssignment);

// Delete an assignment
assignmentRouter.delete('/:id', assignmentController.deleteAssignment);

module.exports = assignmentRouter;
