const express = require("express");
const authController = require("../controllers/authController");
const fieldSanitization = require("../middleware/fieldSanitization");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const route = express.Router();

route.post(
  "/register",
  fieldSanitization.registerSanitization,
  authController.register
);
route.post("/login", fieldSanitization.loginSanitization, authController.login);
route.get("/profile", authentication, authController.profile);
route.get("/admin", authentication, authorization, authController.admin);

module.exports = route;
