const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config");

const ConnectDB = async (callback) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB");
    callback();
  } catch (err) {
    console.log("Error in connection mongodb databse!");
  }
};

module.exports = { ConnectDB };
