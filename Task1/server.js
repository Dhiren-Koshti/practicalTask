const express = require("express");
const userRoute = require("./routes/users");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", userRoute);

app.use("/", (req, res) => {
  res.status(200).send("Hey Guys, I am on live");
});

app.listen(PORT, () => {
  console.log("Server Running....");
});
