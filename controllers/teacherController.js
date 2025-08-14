const teacherService = require("../services/teacherService");


exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherService.getAllTeachers();
    
    return res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }
    return res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const teacherData = req.body;
    console.log(teacherData)
    console.log('file', req.file)

    if(req?.file){
      const folder = req.file.destination.split("public")[1];
      teacherData.photo = `${process.env.BASE_URL}${folder}/${req.file.filename}`;
    }

    const teacher = await teacherService.createTeacher(teacherData);
    
    return res.status(201).json({ success: true, data: teacher });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ success: false, message: error?.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.updateTeacher(req.params.id, req.body);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }
    return res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    return res.status(400).json({ success: false, message: error?.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const deleted = await teacherService.deleteTeacher(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }
    return res.status(200).json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message });
  }
};
