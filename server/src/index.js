// Global configuration
const port = process.env.PORT || 3000;
const gitlabAPIUrl = "https://gitlab.com/api/v4";
const rootGroupName = "emendare";

// Http promise requests
const axios = require("axios");

// Express Html Application
const express = require("express");
const app = express();

// Requests Logger Middleware
const morgan = require("morgan");
app.use(morgan("tiny"));

// Function to add API Url to a partial path
const api = path => gitlabAPIUrl + path;

// Open API CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Get a specific group with subgroups
app.get("/groups/:id", (req, res) => {
  Promise.all([
    axios.get(api(`/groups/${req.params.id}`)),
    axios.get(api(`/groups/${req.params.id}/subgroups`))
  ]).then(values => {
    const data = values[0].data;
    const groups = values[1].data;
    data.groups = groups;
    res.json(data);
  });
});

// Get a specific project
app.get("/projects/:id", (req, res) => {
  axios
    .get(api(`/projects/${req.params.id}`))
    .then(({ data }) => res.json(data));
});

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start Html Server
app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
