const express = require("express");
const semesterRoutes = express.Router();
const semesterController = require("./semesterController");

// CRUD routes
semesterRoutes.post("/", semesterController.createSemester);
semesterRoutes.get("/", semesterController.getAllSemesters);




semesterRoutes.get("/:id", semesterController.getSemesterById);
semesterRoutes.patch("/:id", semesterController.updateSemester);
semesterRoutes.delete("/:id", semesterController.deleteSemester);

module.exports = semesterRoutes;
