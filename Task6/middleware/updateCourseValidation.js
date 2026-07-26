const {
  titleValidation,
  instructorValidation,
  durationValidation,
  feesValidation,
} = require("../validation/courseValidation");

const updateCourseValidation = (req, res, next) => {
  const { title, instructor, duration, fees } = req.body;

  if (title != undefined) {
    titleValidation(title);
  }

  if (instructor != undefined) {
    instructorValidation(instructor);
  }

  if (duration != undefined) {
    durationValidation(duration);
  }

  if (fees != undefined) {
    feesValidation(fees);
  }

  next();
};

module.exports = updateCourseValidation;
