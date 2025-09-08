const Note = require("../../Schema/NoteSchema");
const Subject = require("../../Schema/SubjectSchema");

class NoteService {
  // Create a new note
  async createNote(data) {
    const note = await Note.create(data);

    await Subject.findByIdAndUpdate(
      data?.subject,
      { $push: { notes: note?._id } },
      { new: true }
    );

    return note;
  }

  // Get all notes
  async getAllNotes() {
    return await Note.find().populate("subject")
    .sort({ createdAt: -1 });
  }

  // Get a note by ID
  async getNoteById(id) {
    return await Note.findById(id);
  }

  async updateNote(req, noteId){
  const { files, body } = req; 
  const { oldImages, oldDocuments, tags, ...rest } = body;

  const updatedImages = typeof oldImages === "string" ? [oldImages] : oldImages ?? [];
  const updatedDocuments = typeof oldDocuments === "string" ? [oldDocuments] : oldDocuments ?? [];

  console.log("req.body files", files);
  
  if (files?.images && files.images.length > 0) {
    const newImagePaths = files.images.map((image) => {
      const folder = image.destination.split("public")[1];
      return `${process.env.BASE_URL}${folder}/${image.filename}`.replace(/\\/g, "/");
    });
    updatedImages.push(...newImagePaths); 
  }
  
  if (files?.documents && files.documents.length > 0) {    
    const newDocumentPaths = files?.documents.map((document) => {
      const folder = document?.destination.split("public")[1];
      return `${process.env.BASE_URL}${folder}/${document.filename}`.replace(/\\/g, "/");
    });
    updatedDocuments.push(...newDocumentPaths);
  }
  
  
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
      ...rest,
      tags: tags ? JSON.parse(tags) : [],
      images: updatedImages,
      documents: updatedDocuments
    },
      { new: true } 
    );
    
    return updatedNote;
  } catch (error) {
    throw new Error(`Error updating note: ${error.message}`);
  }
};

  async deleteNote(id, data) {
    try {
      return await Note.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error updating note: ${error.message}`);
    }
  }
}

module.exports = new NoteService();
