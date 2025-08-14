const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,      
    },    
    status: {type: String, enum: ["Active", "Inactive", "Upcoming"], default: "Active"},
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject", // Reference to Subject schema        
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Semester", semesterSchema);
