const express = require("express");
const bookRoutes = require("./routes/books");
const requestLogger = require("./middleware/requestLogger");
const handleError = require("./middleware/handleError");

const app = express(); // create express server

const PORT = 4000; // App is running on PORT 4000

app.use(requestLogger); // Add Logs Request Middleware
app.use(express.json()); // body-parser

app.use("/api/books", bookRoutes); // Book Route

app.use(handleError); // Add Error Handling Middleware

app.use("/", (req, res) => {
  res.status(200).send("Server is Available!");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}....`);
});
