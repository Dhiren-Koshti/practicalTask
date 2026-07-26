const AppError = require("../utils/appError");

const titleValidation = (title) => {
  if (typeof title != "string") {
    throw new AppError("title must be in string format!", 400);
  }

  if (!title.trim()) {
    throw new AppError("title cannot be empty!", 400);
  }

  if (title.length < 3) {
    throw new AppError("title must length of 3", 400);
  }
};

const instructorValidation = (instructor) => {
  if (typeof instructor != "string") {
    throw new AppError("instructor must be in string format!", 400);
  }

  if (!instructor.trim()) {
    throw new AppError("instructor cannot be empty!", 400);
  }
};

const durationValidation = (duration) => {
  if (typeof duration != "number") {
    throw new AppError("duration must be in number format!", 400);
  }

  if (duration <= 0) {
    throw new AppError("duration must be greater than 0!", 400);
  }
};

const feesValidation = (fees) => {
  if (typeof fees != "number") {
    throw new AppError("fees must be in number format!", 400);
  }

  if (fees <= 0) {
    throw new AppError("fees must be greater than 0!", 400);
  }
};

module.exports = {
  titleValidation,
  instructorValidation,
  durationValidation,
  feesValidation,
};
