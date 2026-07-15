const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // The token is invalid, tampered with, or expired
      console.error("Verification failed:", err.message);
      return;
    }

    // The token is valid!
    // console.log("Decoded Payload:", decoded);
    return decoded;
    // Example output: { userId: 123, iat: 171829381, exp: 171829741 }
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
