const express = require("express");
const courseController = require("../controller/courseController");
const bodyValidation = require("../middleware/bodySanitization");
const fieldSanitization = require("../middleware/fieldSanitization");
const createCourseValidation = require("../middleware/createCourseValidation");
const updateCourseValidation = require("../middleware/updateCourseValidation");
const validateCourseQuery = require("../middleware/validateCourseQuery");
const validateId = require("../middleware/validateId");

const route = express.Router();

route.post(
  "/",
  bodyValidation,
  fieldSanitization(["title", "instructor", "duration", "fees"]),
  createCourseValidation,
  courseController.create
);

route.get("/", validateCourseQuery, courseController.getAll);

route.get("/:id", validateId, courseController.getCourse);

route.get("/:id/students", validateId, courseController.getStudentsWithCourse);

route.get("/:id/details", validateId, courseController.getCourseDetails);

route.put(
  "/:id",
  validateId,
  bodyValidation,
  fieldSanitization(["title", "instructor", "duration", "fees"]),
  updateCourseValidation,
  courseController.updateCourse
);

route.delete("/:id", validateId, courseController.deleteCourse);

module.exports = route;
