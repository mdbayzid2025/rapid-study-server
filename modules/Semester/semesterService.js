const Semester = require("../../Schema/SemesterSchema");


class SemesterService {
  // Create a new semester
  async createSemester(data) {
    return  await Semester.create(data);
  }

  // Get all semesters with populated subjects and class
  async getAllSemesters() {
    return await Semester.find().populate({
      path: "subjects",
       populate: {
        path: "teacher",
        model: "Teacher", // Name from TeacherSchema
      },
    })
      .sort({ createdAt: -1 });
  }

  // Get semester by ID with populated subjects and class
  async getSemesterById(id) {
    return await Semester.findById(id)
    // .populate({
    //   path: "subjects",
    //   populate: { path: "class" },
    // });
  }

  // Update semester
  async updateSemester(id, data) {
    const updatedSemester = await Semester.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
    // .populate({
    //   path: "subjects",
    //   populate: { path: "class" },
    // });
    return updatedSemester;
  }

  // Delete semester
  async deleteSemester(id) {
    return await Semester.findByIdAndDelete(id);
  }
}

module.exports = new SemesterService();
