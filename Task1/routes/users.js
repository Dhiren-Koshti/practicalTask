const express = require("express");
const userController = require("../controllers/userController");

const route = express.Router();

route.post("/user", userController.createUserController);
route.get("/users", userController.fetchAllController);
route.get("/user/:id", userController.fetchUserController);
route.put("/user/:id", userController.updateUserController);
route.delete("/user/:id", userController.deleteUserController);

module.exports = route;
