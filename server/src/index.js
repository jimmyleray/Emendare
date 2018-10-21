// Express Html Application
const express = require("express");
const app = express();

// Requests Logger Middleware
const morgan = require("morgan");
app.use(morgan("tiny"));

// MongoDB configuration
const db = require("./mongo");

// MongoDB models
const User = require("./mongo/models/user");

const initAdminDevUser = async () => {
  await User.deleteMany();
  if (!(await User.findOne({ username: "admin" }))) {
    const adminDevUser = new User({ username: "admin", password: "tmp" });
    await adminDevUser.save();
  }
  const userFromDb = await User.find({ username: "admin" });
  console.log(userFromDb);
};

if (process.env !== "production") {
  initAdminDevUser();
}

// Open API CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start Html Server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server start and listening on port ${port}`);
});
