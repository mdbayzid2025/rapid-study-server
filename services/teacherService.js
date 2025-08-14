const Subject = require("../Schema/SubjectSchema");
const Teacher = require("../Schema/TeacherSchema");
Subject

class TeacherService {
  async getAllTeachers() {
    return await Teacher.find().populate("subjects").sort({createdAt: -1});
  }

  async getTeacherById(id) {
    return await Teacher.findById(id).populate("subjects").sort({createdAt: -1});;
  }

  async createTeacher(data) {        
    return await Teacher.create(data);
  }

  async updateTeacher(id, data) {
    return await Teacher.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTeacher(id) {
    return await Teacher.findByIdAndDelete(id);
  }
}

module.exports = new TeacherService();
