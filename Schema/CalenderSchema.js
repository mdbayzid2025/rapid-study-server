// models/CalendarEvent.js

const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  eventId: {type: String},
  end: { type: Date },
  allDay: { type: Boolean, default: false },
  color: { type: String, default: '#3174ad' },
});

const CalenderSchema = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalenderSchema;
