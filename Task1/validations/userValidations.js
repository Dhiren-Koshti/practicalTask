const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Quick Function
function validateEmail(email) {
  return emailRegex.test(email);
}

module.exports = {
  validateEmail,
};
