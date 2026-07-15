const AppError = require("../utils/appError");
const validateEmail = require("../validation/emailValidation");
const authServices = require("../services/authServices");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (name == undefined || typeof name !== "string") {
    throw new AppError(
      "Name must be required & required in string format!",
      400
    );
  }

  if (name.trim().length < 3) {
    throw new AppError("name must be required atleast 3 character");
  }

  if (email == undefined || typeof email !== "string" || !email.trim()) {
    throw new AppError(
      "email must be required & required in string format!",
      400
    );
  }

  if (!validateEmail(email)) {
    throw new AppError("please send valid email!", 400);
  }

  if (password == undefined || typeof password !== "string") {
    throw new AppError(
      "password must be required & required in string format!",
      400
    );
  }

  if (password.trim().length < 8) {
    throw new AppError("password must be required atleast 8 character");
  }

  if (role == undefined || typeof role !== "string") {
    throw new AppError("role must be required & required in role format!", 400);
  }

  if (role != "admin" && role != "employee") {
    throw new AppError("please send only valid role", 400);
  }

  const employee = {
    name,
    email,
    password,
    role,
  };

  const response = await authServices.registerService(employee);
  res.status(201).json({ ...response });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email == undefined || typeof email !== "string" || !email.trim()) {
    throw new AppError(
      "email must be required & required in string format!",
      400
    );
  }

  if (!validateEmail(email)) {
    throw new AppError("please send valid email!", 400);
  }

  if (password == undefined || typeof password !== "string") {
    throw new AppError(
      "password must be required & required in string format!",
      400
    );
  }

  const credentials = { email, password };
  const response = await authServices.loginService(credentials);
  res.status(200).send({ ...response });
};

const profile = async (req, res) => {
  const payload = req.user;
  const response = await authServices.profileServices(payload);
  res.status(200).send({ ...response });
};

const admin = (req, res) => {
  res.status(200).send("Welcome Admin!");
};

module.exports = {
  register,
  login,
  profile,
  admin,
};
