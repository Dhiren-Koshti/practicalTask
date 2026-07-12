const handleError = (err, req, res, next) => {
  if (err) {
    const message = err.message || "Internal Server Error";
    const status = err.status || 500;

    res.status(status).json({ success: false, message });
  }
};

module.exports = handleError;
