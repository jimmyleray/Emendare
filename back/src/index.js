const express = require("express");
const app = express();

// Request list of groups
const groups = require("./mocks/groups");
app.get("/groups", (req, res) => {
  res.send(groups);
});

// Request list of grotextsups
const texts = require("./mocks/texts");
app.get("/texts", (req, res) => {
  res.send(texts);
});

// Error 404 middleware
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Start the server
app.listen(8080, () => {
  console.log("Example app listening on port 8080.");
});
