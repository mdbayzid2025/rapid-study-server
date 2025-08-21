// routes/noteRoute.js
const express  = require("express");

const notesController = require("./notesController");
const upload  = require("../../middleware/uploadFile");

const noteRouter = express.Router()
noteRouter.post(
  "/",
  // upload('notes').fields([{images: "images", maxCount: 10}, {documents: "documents", maxCount: 5}]),
  upload("notes").fields([{name: "images", maxCount: 10}, {name: "documents", maxCount: 5}]),
  notesController.createNote // Create note and handle data saving
);

// Update note
noteRouter.post("/:id/documents", notesController.updateNote);


// Update note
noteRouter.patch("/:id", notesController.updateNote);

// Delete note
noteRouter.delete("/:id", notesController.deleteNote);

// Get all notes
noteRouter.get("/", notesController.getAllNotes);

// Get note by ID
noteRouter.get("/:id", notesController.getNoteById);

module.exports = noteRouter;
