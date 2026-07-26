const courseRepo = require("../repo/courseRepo");
const studentRepo = require("../repo/studentRepo");
const AppError = require("../utils/appError");

const createCourse = async (course) => {
  const findDuplicate = await courseRepo.findOne({
    title: {
      $regex: `^${course.title}$`,
      $options: "i",
    },
  });

  if (findDuplicate) {
    throw new AppError("Course title already exists", 409);
  }

  const create = await courseRepo.create(course);
  return { success: true, message: "created successfully!", course: create };
};

const getAllCourse = async ({ search, sort, page, limit }) => {
  const searchFilter = {};
  const sortFilter = {};

  if (search) {
    searchFilter.$or = [
      { title: { $regex: search, $options: "i" } },
      { instructor: { $regex: search, $options: "i" } },
    ];
  }

  if (sort) {
    if (sort[0] == "-") {
      sortFilter[sort.slice(1)] = -1;
    } else {
      sortFilter[sort] = 1;
    }
  }

  const skip = (page - 1) * limit;

  const courses = await courseRepo.find(searchFilter, sortFilter, skip, limit);

  return {
    success: true,
    message: "fetched successfully!",
    courses,
  };
};

const getCourse = async (id) => {
  const course = await courseRepo.findOne({ _id: id });

  if (!course) {
    throw new AppError("Not Found!", 404);
  }
  return {
    success: true,
    message: "fetched successfully!",
    course,
  };
};

const getStudentsWithCourse = async (id) => {
  const course = await courseRepo.findOne({ _id: id });

  if (!course) {
    throw new AppError("Not Found!", 404);
  }

  const students = await studentRepo.findStudents({ course: course._id });

  return {
    success: true,
    message: "fetched successfully!",
    course: course.title,
    students,
  };
};

const getCourseDetails = async (id) => {
  const course = await courseRepo.findOne({ _id: id });

  if (!course) {
    throw new AppError("Not Found!", 404);
  }

  const counts = await studentRepo.studentCount({ course: course._id });

  return {
    success: true,
    message: "fetched successfully!",
    course: {
      title: course.title,
      instructor: course.instructor,
      duration: course.duration,
      fees: course.fees,
      totalStudents: counts,
    },
  };
};

const updateCourse = async (id, data) => {
  const course = await courseRepo.findOne({ _id: id });

  if (!course) {
    throw new AppError("Not Found!", 404);
  }

  if (data.title) {
    const findDuplicate = await courseRepo.findOne({
      title: {
        $regex: `^${data.title}$`,
        $options: "i",
      },
    });

    if (findDuplicate) {
      throw new AppError("Course title already exists", 409);
    }
  }

  const updatedData = await courseRepo.updateCourse(id, data);
  return {
    success: true,
    message: "updated successfully!",
    updatedData,
  };
};

const deleteCourse = async (id) => {
  const course = await courseRepo.findOne({ _id: id });

  if (!course) {
    throw new AppError("Not Found!", 404);
  }

  const counts = await studentRepo.studentCount({ course: course._id });

  if (counts) {
    throw new AppError(
      "Cannot delete course because students are enrolled.",
      409
    );
  }

  await courseRepo.deleteCourse(id);

  return {
    success: true,
    message: "deleted successfully!",
    course,
  };
};

module.exports = {
  createCourse,
  getAllCourse,
  getCourse,
  getStudentsWithCourse,
  getCourseDetails,
  updateCourse,
  deleteCourse,
};
