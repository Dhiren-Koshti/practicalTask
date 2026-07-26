const courseService = require("../services/courseService");

const create = async (req, res) => {
  const response = await courseService.createCourse(req.body);
  res.status(201).json({ ...response });
};

const getAll = async (req, res) => {
  const response = await courseService.getAllCourse(req.query);
  res.status(200).send({ ...response });
};

const getCourse = async (req, res) => {
  const { id } = req.params;
  const response = await courseService.getCourse(id);
  res.status(200).json({ ...response });
};

const getStudentsWithCourse = async (req, res) => {
  const { id } = req.params;
  const response = await courseService.getStudentsWithCourse(id);
  res.status(200).json({ ...response });
};

const getCourseDetails = async (req, res) => {
  const { id } = req.params;
  const response = await courseService.getCourseDetails(id);
  res.status(200).json({ ...response });
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const response = await courseService.updateCourse(id, req.body);
  res.status(200).json({ ...response });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const response = await courseService.deleteCourse(id);
  res.status(200).send({ ...response });
};

module.exports = {
  create,
  getAll,
  getCourse,
  getStudentsWithCourse,
  getCourseDetails,
  updateCourse,
  deleteCourse,
};
