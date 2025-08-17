const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  date: {
    type: Date,    
  },
  time: {
    type: String,     
  },
  eventType: {
    type: String,
    // enum: ['Practical Exam', 'Lab Test', 'Assignment Submission', 'Meeting', 'Class Test', 'Other'],
  },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, 
  location: {
    type: String,    
  },
  description: {
    type: String,    
  },
}, { timestamps: true }); 

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
