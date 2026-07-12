const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("monogdb connected successfully!");
  } catch (err) {
    console.log("Mongodb Error --->", err);
  }
};

module.exports = {
  connect,
};
