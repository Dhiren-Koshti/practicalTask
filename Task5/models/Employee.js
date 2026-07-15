const moongose = require("mongoose");
const { Schema } = moongose;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["employee", "admin"], // Only these values are allowed
    default: "employee", // Automatically applies if not specified
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = moongose.model("Employee", employeeSchema);

module.exports = Employee;
