const studentService = require("../services/studentService");

const create = async (req, res) => {
  const response = await studentService.createStudent(req.body);
  res.status(201).json({ ...response });
};

const getAll = async (req, res) => {
  const response = await studentService.getAllStudents();
  res.status(200).json({ ...response });
};

const get = async (req, res) => {
  const { id } = req.params;
  const response = await studentService.getStudent(id);
  res.status(200).json({ ...response });
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const response = await studentService.updateStudent(id, req.body);
  res.status(200).json({ ...response });
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const response = await studentService.deleteStudent(id);
  res.status(200).send({ ...response });
};

module.exports = {
  create,
  getAll,
  get,
  updateStudent,
  deleteStudent,
};
