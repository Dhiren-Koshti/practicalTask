const AppError = require("../utils/appError");

const handleError = (err, req, res, next) => {
  if (err) {
    let message = err.message || "Internal Server Error";
    let status = err.status || 500;
    res.status(status).json({ success: false, message });
  }
};

module.exports = handleError;
