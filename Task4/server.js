require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const handleError = require("./middleware/handleError");
const requestLogger = require("./middleware/requestLogger");
const studentRoute = require("./routes/student");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(express.json()); // JSON Parser

app.use("/student", studentRoute);

app.use("/server", async (req, res) => {
  res.status(200).send("Hey Server");
});

app.use(handleError); // Error Handler

(async () => {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`App is running on ${PORT}....`);
  });
})();
