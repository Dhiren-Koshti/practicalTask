const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid student ID", 400);
  }

  next();
};

module.exports = validateId;
