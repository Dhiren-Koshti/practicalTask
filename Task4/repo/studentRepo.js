const Student = require("../models/Student");
const AppError = require("../utils/appError");

const createRepo = async (student) => {
  const duplicateEmail = await Student.findOne({ email: student.email });

  if (duplicateEmail) {
    throw new AppError("Email is already registered!", 409);
  }

  const createStudent = await Student.create(student);
  return {
    success: true,
    message: "Student Created!",
    student: createStudent,
  };
};

const getAllRepo = async ({ search, course, isActive, sort, page, limit }) => {
  const filterConditions = {};
  const sortCondition = {};

  // Filter Conditions
  if (search) {
    filterConditions.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (course) {
    filterConditions.course = { $regex: `^${course}$`, $options: "i" };
  }

  if (isActive == "true" || isActive == true) {
    filterConditions.isActive = true;
  } else {
    filterConditions.isActive = false;
  }

  // Sort Condition
  if (sort[0] == "-") {
    sortCondition[sort.slice(1)] = -1;
  } else {
    sortCondition[sort] = 1;
  }

  const skip = (page - 1) * limit;

  const students = await Student.find(filterConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  return {
    success: true,
    message: "All Students!",
    students,
  };
};

const getRepo = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new AppError("Student is not found", 404);
  }

  return {
    success: true,
    message: "Student data fetched!",
    student,
  };
};

const updateRepo = async (id, updateData) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new AppError("Student is not found", 404);
  }

  const duplicateEmail = await Student.findOne({
    email: updateData.email,
    _id: { $ne: id },
  });

  if (duplicateEmail) {
    throw new AppError("Email is already registered!", 409);
  }

  await Student.updateOne({ _id: id }, { $set: updateData });

  return {
    success: true,
    message: "Update student successfully!",
  };
};

const deleteRepo = async (id) => {
  const student = await Student.findById(id);

  if (!student) {
    throw new AppError("Student is not found", 404);
  }

  await Student.updateOne({ _id: id }, { $set: { isActive: false } });

  return {
    success: true,
    message: "Delete student successfully!",
  };
};
module.exports = {
  createRepo,
  getAllRepo,
  getRepo,
  updateRepo,
  deleteRepo,
};
