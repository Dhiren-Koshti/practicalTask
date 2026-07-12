const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Quick Function
function validateEmail(email) {
  return emailRegex.test(email);
}

// sort Value Validation
function validateSort(sort) {
  const sortValues = [
    "createdAt",
    "-createdAt",
    "name",
    "-name",
    "age",
    "-age",
  ];

  if (!sortValues.includes(sort)) {
    return false;
  }

  return true;
}

module.exports = {
  validateEmail,
  validateSort,
};
