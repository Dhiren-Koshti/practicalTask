const AppError = require("../utils/appError");
const mongoose = require("mongoose");

const nameValidation = (name) => {
  if (typeof name != "string") {
    throw new AppError("name must be in string format!", 400);
  }

  if (!name.trim()) {
    throw new AppError("name cannot be empty!", 400);
  }
};

const emailValidation = (email) => {
  if (typeof email != "string") {
    throw new AppError("email must be in string format!", 400);
  }

  if (!email.trim()) {
    throw new AppError("email cannot be empty!", 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new AppError("please send valid email!", 400);
  }
};

const ageValidation = (age) => {
  if (typeof age != "number") {
    throw new AppError("age must be in number format!", 400);
  }

  if (age <= 12) {
    throw new AppError("age must be greater than 12!", 400);
  }
};

const courseValidation = (course) => {
  if (typeof course != "string") {
    throw new AppError("course must be in string format!", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(course)) {
    throw new AppError("Course Invalid ID", 400);
  }
};

module.exports = {
  nameValidation,
  emailValidation,
  ageValidation,
  courseValidation,
};
