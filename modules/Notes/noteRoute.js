// routes/noteRoute.js
const express = require("express");

const { uploadMultipleImage, uploadMultipleDocuments, fileUploader } = require("../../helper/uploadFile");
const notesController = require("./notesController");

const noteRouter = express.Router();

// Create note (with multiple images and documents)
noteRouter.post("/", fileUploader?.uploadMultipleImage, notesController.createNote);

// Update note
noteRouter.patch("/:id", notesController.updateNote);

// Delete note
noteRouter.delete("/:id", notesController.deleteNote);

// Get all notes
noteRouter.get("/", notesController.getAllNotes);

// Get note by ID
noteRouter.get("/:id", notesController.getNoteById);

module.exports = noteRouter;
