let tasks = require("../db/tasks");
const AppError = require("../utils/appError");
let index = 0;

const createTaskRepo = async (task) => {
  const newTask = { id: ++index, ...task, status: "pending" };
  tasks.push(newTask);
  return {
    message: "Task created successfully",
    task: newTask,
  };
};

const fetchAllTaskRepo = async (status) => {
  if (!status || (status && !status.trim())) {
    return {
      message: "All Tasks",
      tasks: tasks,
    };
  }

  const filterTask = tasks.filter((task) => {
    return task.status == status;
  });

  return {
    message: "All Tasks",
    tasks: filterTask,
  };
};

const fetchTaskRepo = async (id) => {
  const findTask = tasks.find((task) => {
    return task.id == id;
  });

  if (!findTask) {
    throw new AppError("Task is not found", 404);
  }

  return {
    message: "Your Tasks",
    tasks: findTask,
  };
};

const updateTaskRepo = async (updateTask, id) => {
  const findTask = tasks.find((task) => {
    return task.id == id;
  });

  if (!findTask) {
    throw new AppError("Task is not found", 404);
  }

  Object.assign(findTask, updateTask);

  return {
    message: "Your Tasks",
    tasks: findTask,
  };
};

const deleteTaskRepo = async (id) => {
  const findTask = tasks.find((task) => {
    return task.id == id;
  });

  if (!findTask) {
    throw new AppError("Task is not found", 404);
  }

  const updateTasks = tasks.filter((task) => {
    return task.id != id;
  });

  tasks = updateTasks;

  return { message: "Task is sucessfully deleted!" };
};

module.exports = {
  createTaskRepo,
  fetchAllTaskRepo,
  fetchTaskRepo,
  updateTaskRepo,
  deleteTaskRepo,
};
