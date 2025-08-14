const express = require("express");
const upload = require("../middleware/uploadFile");
const { getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } = require("../controllers/teacherController");


const teacherRouter = express.Router();

teacherRouter.get("/", getAllTeachers);
teacherRouter.get("/:id", getTeacherById);

teacherRouter.post("/", upload('teacher').single("photo"), createTeacher);
teacherRouter.patch("/:id", updateTeacher);
teacherRouter.delete("/:id", deleteTeacher);

module.exports = teacherRouter;
