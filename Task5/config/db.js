const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongodb Connected Successfully!");
  } catch (err) {
    console.log("Mongodb connect error:", err);
  }
};

module.exports = connect;
