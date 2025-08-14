const subjectService = require("./subjectService");



class SubjectController {
  async createSubject(req, res) {
    try {
      const subject = await subjectService.createSubject(req.body);
      return res.status(201).json({ success: true, message: "Subject created", data: subject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async getAllSubjects(req, res) {
    try {
      const subjects = await subjectService.getAllSubjects();
      return res.status(200).json({ success: true, data: subjects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async getSubjectById(req, res) {
    try {
      const subject = await subjectService.getSubjectById(req.params.id);
      if (!subject) {
        return res.status(404).json({ success: false, message: "Subject not found" });
      }
      return res.status(200).json({ success: true, data: subject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async updateSubject(req, res) {
    try {
      const subject = await subjectService.updateSubject(req.params.id, req.body);
      if (!subject) {
        return res.status(404).json({ success: false, message: "Subject not found" });
      }
      return res.status(200).json({ success: true, message: "Subject updated", data: subject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async deleteSubject(req, res) {
    try {
      const deleted = await subjectService.deleteSubject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Subject not found" });
      }
      return res.status(200).json({ success: true, message: "Subject deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }
}

module.exports = new SubjectController();
