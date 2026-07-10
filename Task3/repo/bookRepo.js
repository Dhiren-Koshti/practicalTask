const AppError = require("../utils/appError");

let books = [];

let id = 0;

const createBookRepo = async (book) => {
  const creatBook = { id: ++id, ...book, createdAt: new Date().toISOString() };
  books.push(creatBook);
  return {
    success: true,
    message: "Book Created!",
    book: creatBook,
  };
};

const getAllBooksRepo = async ({
  search,
  category,
  minPrice,
  maxPrice,
  sort,
  page,
  limit,
}) => {
  const filterBook = books.filter((book) => {
    return (
      (book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)) &&
      (!category || book.category.toLowerCase() == category) &&
      book.price >= minPrice &&
      book.price <= maxPrice
    );
  });

  if (sort[0] == "-") {
    filterBook.sort((a, b) =>
      sort.slice(1) == "createdAt"
        ? new Date(b[sort.slice(1)]) - new Date(a[sort.slice(1)])
        : b[sort.slice(1)] - a[sort.slice(1)]
    );
  } else {
    sort == "createdAt"
      ? filterBook.sort((a, b) => new Date(a[sort]) - new Date(b[sort]))
      : filterBook.sort((a, b) => a[sort] - b[sort]);
  }

  let offset = (page - 1) * limit;

  return {
    success: true,
    message: "All Books",
    totalBooks: filterBook.length,
    totalPages: Math.ceil(filterBook.length / limit),
    currentPage: page,
    books: filterBook.slice(offset, offset + limit),
  };
};

const stats = async () => {
  const totalPrice = books.reduce((acc, book) => {
    return acc + book.price;
  }, 0);

  const averagePrice = totalPrice / books.length;

  const mostExpensiveBook = books.reduce((acc, book) => {
    if (acc.price) {
      if (acc.price < book.price) {
        return book;
      } else {
        return acc;
      }
    } else {
      return book;
    }
  }, {});

  const oldestPublishedBook = books.reduce((acc, book) => {
    if (acc.publishedYear) {
      if (acc.publishedYear > book.publishedYear) {
        return book;
      } else {
        return acc;
      }
    } else {
      return book;
    }
  }, {});

  return {
    totalBooks: books.length,
    averagePrice,
    mostExpensiveBook,
    oldestPublishedBook,
  };
};

const getBookRepo = async (id) => {
  const findBook = books.find((book) => {
    return book.id == id;
  });

  if (!findBook) {
    throw new AppError("Book is not found!", 404);
  }

  return {
    success: true,
    message: "Your Book!",
    book: findBook,
  };
};

const updateBookRepo = async (id, updateData) => {
  const findBook = books.find((book) => {
    return book.id == id;
  });

  if (!findBook) {
    throw new AppError("Book is not found!", 404);
  }

  Object.assign(findBook, updateData);

  return {
    success: true,
    message: "Update Book!",
    book: findBook,
  };
};

const deleteBookRepo = async (id) => {
  const findBook = books.find((book) => {
    return book.id == id;
  });

  if (!findBook) {
    throw new AppError("Book is not found!", 404);
  }

  const updateBooks = books.filter((book) => {
    return book.id != id;
  });

  books = updateBooks;

  return { success: true, message: "Book is sucessfully deleted!" };
};

module.exports = {
  createBookRepo,
  getAllBooksRepo,
  stats,
  getBookRepo,
  updateBookRepo,
  deleteBookRepo,
};
