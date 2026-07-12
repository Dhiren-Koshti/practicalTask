const AppError = require("../utils/appError");
const {
  validateEmail,
  validateSort,
} = require("../validation/studentValidations");
const studentRepo = require("../repo/studentRepo");

const createStudent = async (req, res) => {
  const { name, email, age, course } = req.body;

  if (!name || (name && !name.trim())) {
    throw new AppError("name must be required!", 400);
  }

  if (!email || (email && !email.trim())) {
    throw new AppError("email must be required!", 400);
  }

  if (!validateEmail(email)) {
    throw new AppError("please send valid email!", 400);
  }

  if (!age) {
    throw new AppError("age must be required!", 400);
  }

  if (typeof age == "string" || age < 18) {
    throw new AppError("please send valid age", 400);
  }

  if (!course || (course && !course.trim())) {
    throw new AppError("course must be required!", 400);
  }

  const student = { name, email, age, course };
  const response = await studentRepo.createRepo(student);
  res.status(201).json({ ...response });
};

const getAllStudent = async (req, res) => {
  const {
    search = "",
    course = "",
    isActive = true,
    sort = "createdAt",
    page = 1,
    limit = 10,
  } = req.query;

  if (
    typeof isActive != "boolean" &&
    isActive != "true" &&
    isActive != "false"
  ) {
    throw new AppError("please send valid isActive value", 400);
  }

  if (sort && !validateSort(sort)) {
    throw new AppError("please send valid sort value", 400);
  }

  if (isNaN(page) || page < 1) {
    throw new AppError("please send valid page value", 400);
  }

  if (isNaN(limit) || limit < 1) {
    throw new AppError("please send valid limit value", 400);
  }

  const query = {
    search: search.trim(),
    course: course.trim(),
    isActive: isActive,
    sort: sort.trim(),
    page: Number(page),
    limit: Number(limit),
  };

  const response = await studentRepo.getAllRepo(query);
  res.status(200).json({ ...response });
};

const getStudent = async (req, res) => {
  const { id } = req.params;
  const response = await studentRepo.getRepo(id);
  res.status(200).send({ ...response });
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (updateData.name != undefined && !updateData.name.trim()) {
    throw new AppError("name not be empty", 400);
  }

  if (updateData.email != undefined && !updateData.email.trim()) {
    throw new AppError("email not be empty", 400);
  }

  if (updateData.email != undefined && !validateEmail(updateData.email)) {
    throw new AppError("please send valid email!", 400);
  }

  if (
    updateData.age != undefined &&
    (typeof updateData.age == "string" || updateData.age < 18)
  ) {
    throw new AppError("please send valid age", 400);
  }

  if (updateData.course != undefined && !updateData.course.trim()) {
    throw new AppError("course not be empty", 400);
  }

  const response = await studentRepo.updateRepo(id, updateData);
  res.status(200).json({ ...response });
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const response = await studentRepo.deleteRepo(id);
  res.status(200).json({ ...response });
};

module.exports = {
  createStudent,
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};
