require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const authRoutes = require("./routes/auth");
const errorhandling = require("./middleware/errorHandling");
const requestLogger = require("./middleware/requestLogger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/server", async (req, res) => {
  res.status(200).send("Hey Bro");
});

app.use(errorhandling); // handle app error

(async () => {
  await db();
  app.listen(PORT, () => {
    console.log(`App is runnig on ${PORT}....`);
  });
})();
