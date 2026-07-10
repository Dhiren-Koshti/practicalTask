const AppError = require("../utils/appError");
const bookRepo = require("../repo/bookRepo");

const createBooks = async (req, res) => {
  const { title, author, category, price, publishedYear } = req.body;

  if (!title || (title && !title.trim())) {
    throw new AppError("title must be required", 400);
  }

  if (!author || (author && !author.trim())) {
    throw new AppError("author must be required", 400);
  }

  if (!category || (category && !category.trim())) {
    throw new AppError("category must be required", 400);
  }

  if (typeof price == "string" || price <= 0) {
    throw new AppError("price must be number or greater than 0", 400);
  }

  if (
    typeof publishedYear == "string" ||
    publishedYear < 0 ||
    publishedYear > new Date().getFullYear()
  ) {
    throw new AppError(
      "publishedYear must be number or in past or present",
      400
    );
  }

  const book = {
    title,
    author,
    category,
    price: Number(price),
    publishedYear: Number(publishedYear),
  };

  const response = await bookRepo.createBookRepo(book);
  res.status(201).json({ ...response });
};

const getAllBooks = async (req, res) => {
  const {
    search = "",
    category = "",
    minPrice = 1,
    maxPrice = Infinity,
    sort = "createdAt",
    page = 1,
    limit = 10,
  } = req.query;

  const query = {
    search: search.trim().toLowerCase(),
    category: category.trim().toLowerCase(),
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
    sort: sort.trim(),
    page: Number(page),
    limit: Number(limit),
  };

  const response = await bookRepo.getAllBooksRepo(query);
  res.status(200).json({ ...response });
};

const stats = async (req, res) => {
  const response = await bookRepo.stats();
  res.status(200).send({ ...response });
};

const getBook = async (req, res) => {
  const { id } = req.params;
  const response = await bookRepo.getBookRepo(id);
  res.status(200).json({ ...response });
};

const updateBook = async (req, res) => {
  const updateData = req.body;
  const { id } = req.params;

  if (!updateData) {
    throw new AppError("please send data for update task", 400);
  }

  if (updateData.id) {
    throw new AppError("you can not update id", 400);
  }

  if (updateData.title != undefined && !updateData.title.trim()) {
    throw new AppError("title not be empty", 400);
  }

  if (updateData.author != undefined && !updateData.author.trim()) {
    throw new AppError("author not be empty", 400);
  }

  if (updateData.category != undefined && !updateData.category.trim()) {
    throw new AppError("category not be empty", 400);
  }

  if (
    updateData.price != undefined &&
    (typeof updateData.price == "string" || updateData.price <= 0)
  ) {
    throw new AppError("price must be number or greater than 0", 400);
  }

  if (
    updateData.publishedYear != undefined &&
    (typeof updateData.publishedYear == "string" ||
      updateData.publishedYear < 0 ||
      updateData.publishedYear > new Date().getFullYear())
  ) {
    throw new AppError(
      "publishedYear must be number or in past or present",
      400
    );
  }

  const response = await bookRepo.updateBookRepo(id, updateData);
  res.status(200).send({ ...response });
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const response = await bookRepo.deleteBookRepo(id);
  res.status(200).send({ ...response });
};

module.exports = {
  createBooks,
  getAllBooks,
  stats,
  getBook,
  updateBook,
  deleteBook,
};
