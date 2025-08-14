const Semester = require("../../Schema/SemesterSchema");
const Subject = require("../../Schema/SubjectSchema");
const Teacher = require("../../Schema/TeacherSchema");

class SubjectService {
  // Create
  async createSubject(data) {
    // 1. Create the subject
    const subject = await Subject.create(data);

    // 2. Push subject ID to semester's subjects array
    await Semester.findByIdAndUpdate(
      data.semester, // semester ID from request
      { $push: { subjects: subject._id } },
      { new: true }
    );

    // 3. Push subject ID into teacher
    await Teacher.findByIdAndUpdate(
      data.teacher,
      { $push: { subjects: subject._id } },
      { new: true }
    );
    
    return subject;
  }

  // Get all (with populate)
  async getAllSubjects() {
    return await Subject.find()
      .populate("semester")
      .populate("teacher")
      .sort({ createdAt: -1 });
  }

  // Get single
  async getSubjectById(id) {
    return await Subject.findById(id).populate("semester").populate("teacher");
  }

  // Update
  async updateSubject(id, data) {
    return await Subject.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete
  async deleteSubject(id) {
    return await Subject.findByIdAndDelete(id);
  }
}

module.exports = new SubjectService();
