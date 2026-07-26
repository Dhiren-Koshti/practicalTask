const Course = require("../models/Course");

const create = async (course) => {
  return await Course.create(course);
};

const findOne = async (query) => {
  return await Course.findOne(query);
};

const find = async (searchFilter, sortFilter, skip, limit) => {
  return await Course.find(searchFilter)
    .sort(sortFilter)
    .skip(skip)
    .limit(limit);
};

const updateCourse = async (id, updateData) => {
  const course = await Course.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  });

  return course;
};

const deleteCourse = async (id) => {
  const course = await Course.findByIdAndDelete(id);
  return course;
};

module.exports = {
  create,
  findOne,
  find,
  updateCourse,
  deleteCourse,
};
