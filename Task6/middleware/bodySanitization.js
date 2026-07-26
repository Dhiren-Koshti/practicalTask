const AppError = require("../utils/appError");

const bodyValidation = (req, res, next) => {
  if (!req.body || Object.keys(req.body) == 0) {
    throw new AppError("body cannot be empty!", 400);
  }

  next();
};

module.exports = bodyValidation;
