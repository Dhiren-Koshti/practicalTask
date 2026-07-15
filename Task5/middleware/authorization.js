const AppError = require("../utils/appError");

const authorization = (req, res, next) => {
  if (req.user.role != "admin") {
    throw new AppError("your are not authorized!", 403);
  }
  next();
};

module.exports = authorization;
