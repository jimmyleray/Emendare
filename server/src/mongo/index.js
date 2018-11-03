const config = require("../config");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const lorem = require("../utils/lorem");

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
const Text = require("./models/text");

const initDatabase = async () => {
  bcrypt.hash("tmp", 10, async (err, hash) => {
    const adminUser = await new User({
      password: hash,
      email: "admin@zenika.com"
    }).save();

    const officialGroup = await new Group({
      owners: [adminUser._id],
      name: "France",
      description: "Groupe officiel francophone",
      official: true
    }).save();

    const privateGroup = await new Group({
      owners: [adminUser._id],
      name: "Zenika",
      description: "Groupe privé Zenika",
      parent: officialGroup._id,
      private: true,
      whitelist: ["*@zenika.com"]
    }).save();

    officialGroup.subgroups.push(privateGroup._id);
    await officialGroup.save();

    const officialText = await new Text({
      owners: [adminUser._id],
      name: "Texte officiel",
      actual: lorem,
      description: "Un texte officiel pour tester",
      group: officialGroup._id
    }).save();

    const privateText = await new Text({
      owners: [adminUser._id],
      name: "Texte privé",
      actual: lorem,
      description: "Un texte privé pour tester",
      group: privateGroup._id
    }).save();

    officialGroup.texts.push(officialText._id);
    await officialGroup.save();

    privateGroup.texts.push(privateText._id);
    await privateGroup.save();
  });
};

if (process.env.NODE_ENV !== "production") {
  database.dropDatabase();
  initDatabase();
}

module.exports = database;
