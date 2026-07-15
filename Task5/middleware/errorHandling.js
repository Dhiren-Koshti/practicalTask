const errorhandling = (err, req, res, next) => {
  if (err) {
    let message = err.message || "Internal Server Error";
    let status = err.status || 500;

    res.status(status).json({
      success: false,
      message,
    });
  }
};

module.exports = errorhandling;
