class AppError extends Error {
  constructor(message, status = 500) {
    super(message); // Creates message, name, stack

    this.status = status; // Adds our custom property
  }
}

module.exports = AppError;
