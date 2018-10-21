const mongoose = require("mongoose");

const mongoHost = process.env.MONGODB_ADDON_HOST || "mongodb://localhost/";

mongoose.connect(
  mongoHost,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB on :", mongoHost);
});

db.on("error", error => {
  console.error("MongoDB Error :", error);
});

module.exports = db;
