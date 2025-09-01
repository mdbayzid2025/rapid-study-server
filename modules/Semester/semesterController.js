
const semesterService = require("./semesterService");

class SemesterController {
  async createSemester(req, res) {

    try {    
      const semester = await semesterService.createSemester(req.body);      
     return  res.status(201).json({ success: true, message: "Semester created", data: semester });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async getAllSemesters(req, res) {

    try {
      const semesters = await semesterService.getAllSemesters();
     return res.json({ success: true, data: semesters });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async getSemesterById(req, res) {
    try {
      const semester = await semesterService.getSemesterById(req.params.id);
      if (!semester) return res.status(404).json({ success: false, message: "Semester not found" });
      res.json({ success: true, data: semester });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async updateSemester(req, res) {
    try {
      const updated = await semesterService.updateSemester(req.params.id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: "Semester not found" });
      res.json({ success: true, message: "Semester updated", data: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  async deleteSemester(req, res) {
    try {
      const deleted = await semesterService.deleteSemester(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: "Semester not found" });
      res.json({ success: true, message: "Semester deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }
}

module.exports = new SemesterController();
