const AppError = require("../utils/appError");

const validateCourseQuery = (req, res, next) => {
  const { search = "", sort = "createdAt", page = 1, limit = 10 } = req.query;

  const allowedSort = [
    "fees",
    "-fees",
    "createdAt",
    "-createdAt",
    "duration",
    "-duration",
  ];

  if (!allowedSort.includes(sort)) {
    throw new AppError("Invalid sort field.", 400);
  }

  if (isNaN(page) || Number(page) < 1) {
    throw new AppError("Invalid page.", 400);
  }

  if (isNaN(limit) || Number(limit) < 1 || Number(limit) > 100) {
    throw new AppError("Limit must be between 1 and 100.", 400);
  }

  req.query = {
    search: search.trim().toLowerCase(),
    sort,
    page: Number(page),
    limit: Number(limit),
  };

  next();
};

module.exports = validateCourseQuery;
