const AppError = require("../utils/appError");

const fieldSanitization = (allowFields) => {
  return (req, res, next) => {
    const fields = Object.keys(req.body);

    const inValid = fields.filter((field) => {
      return !allowFields.includes(field);
    });

    if (inValid.length > 0) {
      throw new AppError(`Invalid fields are:${inValid.join(",")}`);
    }

    next();
  };
};

module.exports = fieldSanitization;
