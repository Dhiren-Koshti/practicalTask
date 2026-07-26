const express = require("express");
const route = express.Router();
const studentController = require("../controller/studentController");
const bodyValidation = require("../middleware/bodySanitization");
const fieldSanitization = require("../middleware/fieldSanitization");
const createStudentValidation = require("../middleware/createStudentValidation");
const updateStudentValidation = require("../middleware/updateStudentValidation");
const validateId = require("../middleware/validateId");

route.post(
  "/",
  bodyValidation,
  fieldSanitization(["name", "email", "age", "course"]),
  createStudentValidation,
  studentController.create
);

route.get("/", studentController.getAll);

route.get("/:id", validateId, studentController.get);

route.put(
  "/:id",
  validateId,
  bodyValidation,
  fieldSanitization(["name", "email", "age", "course"]),
  updateStudentValidation,
  studentController.updateStudent
);

route.delete("/:id", validateId, studentController.deleteStudent);

module.exports = route;
