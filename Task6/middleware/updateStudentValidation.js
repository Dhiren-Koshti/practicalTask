const {
  nameValidation,
  emailValidation,
  ageValidation,
  courseValidation,
} = require("../validation/studentValidation");

const updateStudentValidation = (req, res, next) => {
  const { name, email, age, course } = req.body;

  if (name != undefined) {
    nameValidation(name);
  }

  if (email != undefined) {
    emailValidation(email);
  }

  if (age != undefined) {
    ageValidation(age);
  }

  if (course != undefined) {
    courseValidation(course);
  }

  next();
};

module.exports = updateStudentValidation;
