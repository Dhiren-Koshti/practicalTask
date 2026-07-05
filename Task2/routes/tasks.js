const express = require("express");
const taskController = require("../controllers/taskController");
const validTaskId = require("../middleware/validTaskId");

const route = express.Router();

route.post("/tasks", taskController.createTask);
route.get("/tasks", taskController.fetchAllTask);
route.get("/tasks/:id", validTaskId, taskController.fetchTask);
route.put("/tasks/:id", validTaskId, taskController.updateTask);
route.delete("/tasks/:id", validTaskId, taskController.deleteTask);

module.exports = route;
