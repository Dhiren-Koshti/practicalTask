const AppError = require("../utils/appError");
const taskRepository = require("../repo/taskRepository");

const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || (title && !title.trim())) {
    throw new AppError("title must be required!", 400);
  }

  if (title.length < 3 || title.length > 100) {
    throw new AppError("title length of 3 to 100 characters", 400);
  }

  if (!description || (description && !description.trim())) {
    throw new AppError("description must be required!", 400);
  }

  const task = { title, description };
  const response = await taskRepository.createTaskRepo(task);
  res.status(201).json({ ...response });
};

const fetchAllTask = async (req, res) => {
  const { status } = req.query;

  if (status && status != "pending" && status != "completed") {
    throw new AppError("please send valid status", 400);
  }

  const response = await taskRepository.fetchAllTaskRepo(status);
  res.status(200).json({ ...response });
};

const fetchTask = async (req, res) => {
  const { id } = req.params;
  const response = await taskRepository.fetchTaskRepo(id);
  res.status(200).json({ ...response });
};

const updateTask = async (req, res) => {
  const updateTask = req.body;
  const { id } = req.params;

  if (!updateTask) {
    throw new AppError("please send data for update task", 400);
  }

  if (updateTask.id) {
    throw new AppError("you can not update id", 400);
  }

  if (
    updateTask.title &&
    (updateTask.title.length < 3 || updateTask.title.length > 100)
  ) {
    throw new AppError("title length of 3 to 100 characters", 400);
  }

  if (
    updateTask.status &&
    updateTask.status != "pending" &&
    updateTask.status != "completed"
  ) {
    throw new AppError("please send valid status", 400);
  }

  const response = await taskRepository.updateTaskRepo(updateTask, id);
  res.status(200).json({ ...response });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const response = await taskRepository.deleteTaskRepo(id);
  res.status(200).json({ ...response });
};

module.exports = {
  createTask,
  fetchAllTask,
  fetchTask,
  updateTask,
  deleteTask,
};
