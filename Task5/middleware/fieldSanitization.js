const AppError = require("../utils/appError");

const registerSanitization = (req, res, next) => {
  if (!req.body) {
    throw new AppError("req.body not be undefined", 400);
  }

  const fields = Object.keys(req.body);

  if (fields.length == 0) {
    throw new AppError("req.body not be empty", 400);
  }

  const allowFields = ["name", "email", "password", "role"];

  const invalidFields = fields.filter((field) => {
    return !allowFields.includes(field);
  });

  if (invalidFields.length > 0) {
    throw new AppError(`Invalid Fields are:${invalidFields.join(",")}`, 400);
  }
  next();
};

const loginSanitization = (req, res, next) => {
  if (!req.body) {
    throw new AppError("req.body not be undefined", 400);
  }

  const fields = Object.keys(req.body);

  if (fields.length == 0) {
    throw new AppError("req.body not be empty", 400);
  }

  const allowFields = ["email", "password"];

  const invalidFields = fields.filter((field) => {
    return !allowFields.includes(field);
  });

  if (invalidFields.length > 0) {
    throw new AppError(`Invalid Fields are:${invalidFields.join(",")}`, 400);
  }
  next();
};

module.exports = {
  registerSanitization,
  loginSanitization,
};
