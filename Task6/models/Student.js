const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: [1, "age must be greater than 0"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course", // Must exactly match the name of the target model
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
