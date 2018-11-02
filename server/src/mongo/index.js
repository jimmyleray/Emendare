const config = require("../config");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect(
  config.mongoHost,
  { useNewUrlParser: true }
);

const database = mongoose.connection;

database.once("open", () => {
  console.log("Connected to MongoDB on", config.mongoHost);
});

database.on("error", error => {
  console.error("MongoDB Error", error);
});

// MongoDB models
const User = require("./models/user");
const Group = require("./models/group");

const initDatabase = async () => {
  bcrypt.hash("tmp", 10, async (err, hash) => {
    await new User({
      password: hash,
      email: "admin@zenika.com"
    }).save();
  });
  await new Group({ name: "test" }).save();
};

if (process.env.NODE_ENV !== "production") {
  database.dropDatabase();
  initDatabase();
}

module.exports = database;
