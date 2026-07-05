const errorHandling = (err, req, res, next) => {
  if (err) {
    res.status(err.status).json({ sucess: false, message: err.message });
    return;
  }

  return;
};

module.exports = errorHandling;
