const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Monogdb connected successfully!");
  } catch (error) {
    console.log("Mongodb connection error:", error);
  }
};

module.exports = connect;
