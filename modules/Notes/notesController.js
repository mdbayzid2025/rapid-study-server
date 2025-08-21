// controllers/noteController.js

const noteService = require("./noteService");

class NoteController {

  async createNote(req, res) {
    try {

        if (req.file) {
      const folder = req.file.destination.split("public")[1];
      req.body.photo = `${process.env.BASE_URL}${folder}/${req.file.filename}`.replace(/\\/g, "/");
    }

      // Handle local document URLs
      if (req?.files?.images && req?.files?.images.length > 0) {
        const filePaths = req.files.images.map((images) => {
          // Build the local file path
          const folder = images.destination.split("public")[1];
          return `${process.env.BASE_URL}${folder}/${images.filename}`.replace(/\\/g, "/");
        });

        req.body.images = filePaths; // Store documents array in the body
      }
      // Handle local document URLs
      if (req?.files?.documents && req?.files?.documents.length > 0) {
        const filePaths = req.files.documents.map((document) => {
          // Build the local file path
          const folder = document.destination.split("public")[1];
          return `${process.env.BASE_URL}${folder}/${document.filename}`.replace(/\\/g, "/");
        });

        req.body.documents = filePaths; // Store documents array in the body
      }
      
      // Prepare data to be saved
      const noteData = {
        title: req?.body?.title,
        description: req?.body?.description,
        subject: req?.body?.subject,
        priority: req?.body?.priority,
        tags: req?.body?.tags,
        image: req.body.images, // Images uploaded to Cloudinary
        documents: req.body.documents, // Documents uploaded locally
      };

      console.log("noteData", noteData);

      // You can save `noteData` to your database here
      // const note = await noteService.createNote(noteData);

      return res.status(201).json({ success: true, message: "Note created", data: req.body });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async updateNote(req, res) {
    try {
      const noteId = req.params.id; // Get the note ID from the URL parameters

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
