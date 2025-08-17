
const  Note = require("../../Schema/NoteSchema");
const Subject = require("../../Schema/SubjectSchema");


class NoteService {
  // Create a new note
  async createNote(data) {    
    const note =  await Note.create(data);        

    await Subject.findByIdAndUpdate(
      data?.subject, 
      {$push: {notes: note?._id}},
      {new: true},
    )

    return note;
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
