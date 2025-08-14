const express = require("express");
const subjectController = require("./subjectController");
const subjectRoutes = express.Router();


subjectRoutes.post("/", subjectController.createSubject);
subjectRoutes.get("/", subjectController.getAllSubjects);
subjectRoutes.get("/:id", subjectController.getSubjectById);
subjectRoutes.patch("/:id", subjectController.updateSubject);
subjectRoutes.delete("/:id", subjectController.deleteSubject);

module.exports = subjectRoutes;
