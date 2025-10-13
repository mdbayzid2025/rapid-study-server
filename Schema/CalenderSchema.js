// models/CalendarEvent.js

const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    eventId: { type: String },
    end: { type: Date },
    allDay: { type: Boolean, default: false },
    color: { type: String, default: "#3174ad" },
    item: { type: Schema.Types.ObjectId, refPath: "type" },
    type: {
      type: String,
      enum: ["Assignment", "Event", "ClassTest", "Exam", "Meeting"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const CalenderSchema = mongoose.model("CalendarEvent", calendarEventSchema);

module.exports = CalenderSchema;
