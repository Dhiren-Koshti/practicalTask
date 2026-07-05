const express = require("express");
const taskRoutes = require("./routes/tasks");
const errorHandling = require("./middleware/errorHandling");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/api", taskRoutes);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}....`);
});
