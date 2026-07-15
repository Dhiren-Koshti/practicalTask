const Employee = require("../models/Employee");

const create = async (employee) => {
  return await Employee.create(employee);
};

const findOne = async (query) => {
  return await Employee.findOne(query);
};

module.exports = {
  create,
  findOne,
};
