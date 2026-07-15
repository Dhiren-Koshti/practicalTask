const AppError = require("../utils/appError");
const password = require("../utils/password");
const authRepo = require("../repo/authRepo");
const { generateToken } = require("../utils/token");

const registerService = async (employee) => {
  const duplicateEmail = await authRepo.findOne({ email: employee.email });

  if (duplicateEmail) {
    throw new AppError("email is already registerd!", 409);
  }

  const hash = await password.hashPassword(employee.password);
  employee = { ...employee, password: hash };

  const createEmployee = await authRepo.create(employee);

  return {
    success: true,
    message: "Employee registered successfully",
    employee: createEmployee,
  };
};

const loginService = async (credentials) => {
  const findUser = await authRepo.findOne({
    email: credentials.email,
  });

  if (!findUser) {
    throw new AppError("user not found!", 401);
  }

  if (!findUser.isActive) {
    throw new AppError("Account is inactive", 403);
  }

  const isMatch = await password.verifyPassword(
    credentials.password,
    findUser.password
  );

  if (!isMatch) {
    throw new AppError("password is invalid", 401);
  }

  const payload = { id: findUser._id, role: findUser.role };
  const token = generateToken(payload);
  return { success: true, token };
};

const profileServices = async (payload) => {
  const findUser = await authRepo.findOne({ _id: payload.id });

  if (!findUser) {
    throw new AppError("user not found!", 401);
  }

  if (!findUser.isActive) {
    throw new AppError("Account is inactive", 403);
  }

  return { user: findUser };
};

module.exports = {
  registerService,
  loginService,
  profileServices,
};
