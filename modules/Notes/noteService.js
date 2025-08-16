
const  Note = require("../../Schema/NoteSchema");

class NoteService {
  // Create a new note
  async createNote(data) {    
    return await Note.create(data);        
  }

  // Get all notes
  async getAllNotes() {
    return await Note.find()
.populate("subject")  
      .sort({ createdAt: -1 });
  }

  // Get a note by ID
  async getNoteById(id) {
    return await Note.findById(id);
  }

  async updateNote(id, data) {
    try {
      const updatedNote = await Note.findByIdAndUpdate(id, data, { new: true });
      return updatedNote; // Return the updated note
    } catch (error) {
      throw new Error(`Error updating note: ${error.message}`);
    }
  }
  async deleteNote(id, data) {
    try {
      return await Note.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error updating note: ${error.message}`);
    }
  }
}

module.exports = new NoteService();
