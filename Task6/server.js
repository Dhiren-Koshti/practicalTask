require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const courseRoutes = require("./routes/course");
const studentRoutes = require("./routes/student");
const errorHandling = require("./middleware/errorHandling");
const requestLogger = require("./middleware/requestLogger");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(requestLogger);

app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);

app.use("/server", (req, res) => {
  res.status(200).send("Hey Server");
});

app.use(errorHandling);

(async () => {
  await db();
  app.listen(PORT, () => {
    console.log(`App listening on ${PORT}....`);
  });
})();
