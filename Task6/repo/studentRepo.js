const Student = require("../models/Student");

const create = async (student) => {
  return await Student.create(student);
};

const findOne = async (query) => {
  return await Student.findOne(query);
};

const find = async () => {
  return await Student.find().populate("course");
};

const findWithCourse = async (id) => {
  return await Student.findOne({ _id: id }).populate("course");
};

const updateStudent = async (id, updateData) => {
  const student = await Student.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  }).populate("course");

  return student;
};

const deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id).populate("course");
  return student;
};

const findStudents = async (query) => {
  return await Student.find(query);
};

const studentCount = async (query) => {
  return await Student.countDocuments(query);
};

module.exports = {
  create,
  findOne,
  find,
  findWithCourse,
  updateStudent,
  deleteStudent,
  findStudents,
  studentCount,
};
