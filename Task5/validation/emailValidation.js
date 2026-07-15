const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Quick Function
const validateEmail = (email) => {
  return emailRegex.test(email);
};

module.exports = validateEmail;
