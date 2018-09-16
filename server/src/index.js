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

// Function to add API Url to a partial path
const api = path => config.gitlabAPIUrl + path;

// Function to send response data
const send = res => ({ data }) => res.json(data);

// Get list of all root groups
app.get("/groups", (req, res) => {
  axios.get(api(`/groups/${config.rootGroupName}/subgroups`)).then(send(res));
});

// Get a specific group
app.get("/groups/:id", (req, res) => {
  axios.get(api(`/groups/${req.params.id}`)).then(send(res));
});

// Get list of subgroups in a specific group
app.get("/groups/:id/subgroups", (req, res) => {
  axios.get(api(`/groups/${req.params.id}/subgroups`)).then(send(res));
});

// Get list of projects in a specific group
app.get("/groups/:id/projects", (req, res) => {
  axios.get(api(`/groups/${req.params.id}/projects`)).then(send(res));
});

// Get a specific project
app.get("/projects/:id", (req, res) => {
  axios.get(api(`/projects/${req.params.id}`)).then(send(res));
});

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start Html Server
app.listen(config.port, () => {
  console.log(`Server start on port ${config.port}`);
});
