// Global configuration
const config = require("./config");

// Http promise requests
const axios = require("axios");

// Express Html Application
const express = require("express");
const app = express();

// Requests Logger Middleware
const morgan = require("morgan");
app.use(morgan("tiny"));

// Get list of all root groups
app.get("/groups", (req, res) => {
  const url = config.gitlabAPIUrl + `/groups/${config.rootGroupName}/subgroups`;
  axios.get(url).then(({ data }) => {
    res.json(data);
  });
});

// Get a specific group
app.get("/groups/:id", (req, res) => {
  const url = config.gitlabAPIUrl + `/groups/${req.params.id}`;
  axios.get(url).then(({ data }) => {
    res.json(data);
  });
});

// Get list of subgroups in a specific group
app.get("/groups/:id/subgroups", (req, res) => {
  const url = config.gitlabAPIUrl + `/groups/${req.params.id}/subgroups`;
  axios.get(url).then(({ data }) => {
    res.json(data);
  });
});

// Get list of projects in a specific group
app.get("/groups/:id/projects", (req, res) => {
  const url = config.gitlabAPIUrl + `/groups/${req.params.id}/projects`;
  axios.get(url).then(({ data }) => {
    res.json(data);
  });
});

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start Html Server
app.listen(config.port, () => {
  console.log(`Server start on port ${config.port}.`);
});
