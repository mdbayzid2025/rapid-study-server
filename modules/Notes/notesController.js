// controllers/noteController.js
const { fileUploader } = require("../../helper/uploadFile");
const noteService = require("./noteService");

class NoteController {
  async createNote(req, res) {
    try {
       let cloudinaryResults = [];   
       const images = []    ;
    if (req.file) {
    //   Handle single file upload
      const cloudinaryResult = await fileUploader.uploadToCloudinary({
        ...req.file,
        resource_type: "image",
        folder: "uploads",
        use_filename: true,
        unique_filename: true,
        overwrite: true,
      });
      cloudinaryResults.push(cloudinaryResult);
    } else if (req.files && req.files.images && req.files.images.length > 0) {      
      for (let file of req.files.images) {
        const cloudinaryResult = await fileUploader.uploadToCloudinary({
          ...file,
          resource_type: "image",
          folder: "uploads",
          use_filename: true,
          unique_filename: true,
          overwrite: true,
        });
        images?.push(cloudinaryResult?.secure_url);
      }
    }

      // Assuming that images and docs are uploaded through the request
      const noteData = {
        title: req?.body?.title,
        description: req?.body?.description,
        subject: req?.body?.subject,
        images
      };

        const note = await noteService.createNote(noteData);
      return res
        .status(201)
        .json({ success: true, message: "Note created", data: note });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async updateNote(req, res) {
    try {
      const noteId = req.params.id; // Get the note ID from the URL parameters
      const { title, description, subject } = req.body;

      // Assuming that images and documents are uploaded through the request
      const noteData = {
        title,
        description,
        subject,
        // images: req?.files?.filter(file => file.mimetype.startsWith('image')).map(file => file.path),
        // documents: req?.files?.filter(file => file.mimetype.startsWith('application')).map(file => file.path),
      };

      // Update the note using the service
      const updatedNote = await noteService.updateNote(noteId, req.body);

      if (!updatedNote) {
        return res
          .status(404)
          .json({ success: false, message: "Note not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Note updated successfully",
        data: updatedNote,
      });
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }

  async getAllNotes(req, res) {
    try {
      const notes = await noteService.getAllNotes();
      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async getNoteById(req, res) {
    try {
      const note = await noteService.getNoteById(req.params.id);
      if (!note) {
        return res
          .status(404)
          .json({ success: false, message: "Note not found" });
      }
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async deleteNote(req, res) {
    try {
      const deleted = await noteService.deleteNote(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Note not found" });
      }
      return res.status(200).json({ success: true, message: "Note deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }
}

module.exports = new NoteController();
