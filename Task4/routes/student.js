const express = require("express");
const studentController = require("../controller/studentController");
const validateId = require("../middleware/validateId");
const fieldChecker = require("../middleware/fieldChecker");

const route = express.Router();

route.post("/", fieldChecker, studentController.createStudent);
route.get("/", studentController.getAllStudent);
route.get("/:id", validateId, studentController.getStudent);
route.put("/:id", validateId, fieldChecker, studentController.updateStudent);
route.patch("/:id", validateId, studentController.deleteStudent);

module.exports = route;
