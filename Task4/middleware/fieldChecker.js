const AppError = require("../utils/appError");

const fieldChecker = (req, res, next) => {
  if (!req.body) {
    throw new AppError("Request body cannot be undefined", 400);
  }

  if (Object.keys(req.body).length == 0) {
    throw new AppError("Request body cannot be empty", 400);
  }

  const allowedFields = ["name", "email", "age", "course"];

  const requestFields = Object.keys(req.body);

  const invalidFields = requestFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    throw new AppError(`Invalid field(s): ${invalidFields.join(", ")}`, 400);
  }

  next();
};

module.exports = fieldChecker;
