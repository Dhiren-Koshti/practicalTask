const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/token");

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Missing or malformed token", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("Access denied. No token provided.", 401);
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    throw new AppError("Invalid or expired token.", 401);
  }

  req.user = decoded;
  next();
};

module.exports = authentication;
