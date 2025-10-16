const { sendNotifications } = require("../../helper/notificationHelper");
const Note = require("../../Schema/NoteSchema");
const Subject = require("../../Schema/SubjectSchema");
const QueryBuilder = require("../../utility/QueryBuilder");

class NoteService {
  // Create a new note
  async createNote(data) {
    const note = await Note.create(data);

   const subject = await Subject.findByIdAndUpdate(
      data?.subject,
      { $push: { notes: note?._id } },
      { new: true }
    ).select('name');
    
    sendNotifications({
      title: "Add new notes",
      message: `Add new note of  <b >${subject?.name}</b>.`,      
      receiver: "68dcfbd20fa1a936d5ce1c39",
      type: "Note",
      read: false,
      reference: subject._id      
    });
    return note;
  }

  // Get all notes
  async getAllNotes(query) {
    const notesQueryBuilder = new QueryBuilder(
      Note.find().populate("subject"),
      query
    )
      .search(["title", "tags", "subject.name"])
      .filter()
      .sort()
      .fields()
      .paginate();

    const notes = await notesQueryBuilder.modelQuery;

    return notes;
  }

  // Get a note by ID
  async getNoteById(id) {
    return await Note.findById(id);
  }

  async updateNote(req, noteId) {
    const { files, body } = req;
    const { oldImages, oldDocuments, tags, ...rest } = body;

    const updatedImages =
      typeof oldImages === "string" ? [oldImages] : oldImages ?? [];
    const updatedDocuments =
      typeof oldDocuments === "string" ? [oldDocuments] : oldDocuments ?? [];

    if (files?.images && files.images.length > 0) {
      const newImagePaths = files.images.map((image) => {
        const folder = image.destination.split("public")[1];
        return `${folder}/${image.filename}`.replace(/\\/g, "/");
      });
      updatedImages.push(...newImagePaths);
    }

    if (files?.documents && files.documents.length > 0) {
      const newDocumentPaths = files?.documents.map((document) => {
        const folder = document?.destination.split("public")[1];
        return `${folder}/${document.filename}`.replace(/\\/g, "/");
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
          documents: updatedDocuments,
        },
        { new: true }
      );
      return updatedNote;
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
