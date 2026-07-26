const AppError = require("../utils/appError");
const {
  nameValidation,
  emailValidation,
  ageValidation,
  courseValidation,
} = require("../validation/studentValidation");

const createStudentValidation = (req, res, next) => {
  const { name, email, age, course } = req.body;

  if (name == undefined) {
    throw new AppError("name must be required!", 400);
  }

  if (email == undefined) {
    throw new AppError("email must be required!", 400);
  }

  if (age == undefined) {
    throw new AppError("age must be required!", 400);
  }

  if (course == undefined) {
    throw new AppError("course must be required!", 400);
  }

  nameValidation(name);
  emailValidation(email);
  ageValidation(age);
  courseValidation(course);
  next();
};

module.exports = createStudentValidation;
