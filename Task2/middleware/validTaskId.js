const AppError = require("../utils/appError");

const validTaskId = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("task id must be required", 400);
  }

  const paramRegex = /^[1-9]\d*$/;

  if (!paramRegex.test(id)) {
    throw new AppError(
      "Error: Parameter must be a positive integer greater than zero.",
      400
    );
  }

  next();
};

module.exports = validTaskId;
