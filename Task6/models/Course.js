const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    instructor: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: [1, "duration must be greater than 0"],
    },
    fees: {
      type: Number,
      required: true,
      min: [1, "fees must be greater than 0"],
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
