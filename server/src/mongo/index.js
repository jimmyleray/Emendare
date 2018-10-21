const config = require("../config");
const mongoose = require("mongoose");

const mongoHost = process.env.MONGODB_ADDON_URI || config.localHost;

mongoose.connect(
  mongoHost,
  { useNewUrlParser: true }
);

const database = mongoose.connection;

database.once("open", () => {
  console.log("Connected to MongoDB on", mongoHost);
});

database.on("error", error => {
  console.error("MongoDB Error", error);
});

module.exports = database;
