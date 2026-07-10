const express = require("express");
const bookController = require("../controllers/booksController");
const validTaskId = require("../middleware/validTaskId");

const route = express.Router(); // create route

route.post("/", bookController.createBooks);
route.get("/", bookController.getAllBooks);
route.get("/stats", bookController.stats);
route.get("/:id", validTaskId, bookController.getBook);
route.put("/:id", validTaskId, bookController.updateBook);
route.delete("/:id", validTaskId, bookController.deleteBook);

module.exports = route;
