const mongoose = require("mongoose");

const localHost = "mongodb://localhost:27017/emendare";
const mongoHost = process.env.MONGODB_ADDON_URI || localHost;

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
