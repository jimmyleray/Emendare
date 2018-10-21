// Global configuration
const config = require("./config");

// Express Html Application
const express = require("express");
const app = express();

// Requests Logger Middleware
const morgan = require("morgan");
app.use(morgan("tiny"));

// MongoDB connection
const database = require("./mongo");

// MongoDB models
const User = require("./mongo/models/user");

const initDevDatabase = async () => {
  await User.deleteMany();
  if (!(await User.findOne({ username: "admin" }))) {
    const adminDevUser = new User({ username: "admin", password: "tmp" });
    await adminDevUser.save();
  }
  const userFromDb = await User.find({ username: "admin" });
  console.log(userFromDb);
};

if (process.env !== "production") {
  initDevDatabase();
}

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).end();
});

// Start Http Server
const port = Number(process.env.PORT) || config.devPort;
app.listen(port, () => {
  console.log(`Server start and listening on port ${port}`);
});
