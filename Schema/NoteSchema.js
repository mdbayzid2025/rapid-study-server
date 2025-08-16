// models/NoteSchema.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  documents: [{ type: String }],
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // Reference to Subject
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Exporting the model
module.exports = mongoose.model("Note", noteSchema);
