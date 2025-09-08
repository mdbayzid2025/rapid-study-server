const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nameCode: { type: String,  },
    designation: { type: String, },
    department: { type: String, },
    email: { type: String,  },
    contact: { type: String },
    photo: { type: String }, // store image URL or file path
    remarks: { type: String },
    subjects: [{type: mongoose.Schema.Types.ObjectId, ref: "Subject",},],
    status: [{ type: String, default: "Active" }, ], // array of subjects
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
