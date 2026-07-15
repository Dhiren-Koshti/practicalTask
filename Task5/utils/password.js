const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");

const hashPassword = async (planPassword) => {
  const saltRounds = 10; // Determines the computational cost

  // Automatically generates a salt and hashes the password together
  try {
    const hashedPassword = await bcrypt.hash(planPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new AppError("Something Went Wrong", 500);
  }
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    // Safely compares plain text against the cryptographic hash
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch; // Returns true or false
  } catch (error) {
    console.error("Verification failed:", error);
    throw new AppError("Something Went Wrong", 500);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};
