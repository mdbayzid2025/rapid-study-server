const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', 
    required: true,
  },
  submissionDate: {
    type: Date,
    required: true,  
  },
  time: {
    type: String,  
    required: true,
  },
  detailedInstructions: {
    type: String,  
    required: true,
  },
  attached: {
    type: String,  
    required: false,
  },
}, { timestamps: true });  

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
