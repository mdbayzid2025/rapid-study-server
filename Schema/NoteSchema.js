// models/NoteSchema.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  documents: [{ type: String }],
  tags: [{ type: String }],
  priority: { type: String },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // Reference to Subject  
},{timestamps: true});

// Exporting the model
module.exports = mongoose.model("Note", noteSchema);


