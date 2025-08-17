const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    notes: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",      
    }],
    todos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo"
    }],
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }],
    assignments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
