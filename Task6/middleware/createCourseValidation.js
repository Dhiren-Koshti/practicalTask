const AppError = require("../utils/appError");
const {
  titleValidation,
  instructorValidation,
  durationValidation,
  feesValidation,
} = require("../validation/courseValidation");

const createCourseValidation = (req, res, next) => {
  const { title, instructor, duration, fees } = req.body;

  if (title == undefined) {
    throw new AppError("title must be required!", 400);
  }

  if (instructor == undefined) {
    throw new AppError("instructor must be required!", 400);
  }

  if (duration == undefined) {
    throw new AppError("duration must be required!", 400);
  }

  if (fees == undefined) {
    throw new AppError("fees must be required!", 400);
  }

  titleValidation(title);
  instructorValidation(instructor);
  durationValidation(duration);
  feesValidation(fees);
  next();
};

module.exports = createCourseValidation;
