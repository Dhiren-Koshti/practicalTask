const AppError = require("../utils/appError");
const studentRepo = require("../repo/studentRepo");
const courseRepo = require("../repo/courseRepo");

const createStudent = async (student) => {
  const findEmail = await studentRepo.findOne({ email: student.email });

  if (findEmail) {
    throw new AppError("please use another email id!", 409);
  }

  const findCourse = await courseRepo.findOne({ _id: student.course });

  if (!findCourse) {
    throw new AppError("not found!", 404);
  }

  const create = await studentRepo.create(student);

  return {
    success: true,
    message: "student created!",
    student: create,
  };
};

const getAllStudents = async () => {
  const students = await studentRepo.find();
  return {
    success: true,
    message: "fetched successfully!",
    students,
  };
};

const getStudent = async (id) => {
  const student = await studentRepo.findWithCourse(id);

  if (!student) {
    throw new AppError("not found!", 404);
  }

  return {
    success: true,
    message: "fetched successfully!",
    student,
  };
};

const updateStudent = async (id, data) => {
  const findStudent = await studentRepo.findOne({ _id: id });

  if (!findStudent) {
    throw new AppError("not found!", 404);
  }

  if (data.email) {
    const findEmail = await studentRepo.findOne({ email: data.email });

    if (findEmail) {
      throw new AppError("please use another email id!", 409);
    }
  }

  if (data.course) {
    const findCourse = await courseRepo.findOne({ _id: data.course });

    if (!findCourse) {
      throw new AppError("course not exist", 404);
    }
  }

  const updatedData = await studentRepo.updateStudent(id, data);

  return {
    success: true,
    message: "updated successfully!",
    updatedData,
  };
};

const deleteStudent = async (id) => {
  const student = await studentRepo.deleteStudent(id);

  if (!student) {
    throw new AppError("Not Found!", 404);
  }

  return {
    success: true,
    message: "deleted successfully!",
    student,
  };
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
