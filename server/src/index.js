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
    res.json(
      data.map(each => ({
        id: each.id,
        name: each.name,
        parent_id: each.parent_id,
        web_url: each.web_url
      }))
    );
  });
});

// Get a specific group
app.get("/groups/:id", (req, res) => {
  const url = config.gitlabAPIUrl + `/groups/${req.params.id}`;
  axios.get(url).then(({ data }) => {
    res.json({
      id: data.id,
      name: data.name,
      parent_id: data.parent_id,
      web_url: data.web_url
    });
  });
});

// Get list of subgroups in a specific group
app.get("/groups/:id/subgroups", (req, res) => {
  const url = config.gitlabAPIUrl + `/groups/${req.params.id}/subgroups`;
  axios.get(url).then(({ data }) => {
    res.json(
      data.map(each => ({
        id: each.id,
        name: each.name,
        parent_id: each.parent_id,
        web_url: each.web_url
      }))
    );
  });
});

// Get list of projects in a specific group
app.get("/groups/:id/projects", (req, res) => {
  const url = config.gitlabAPIUrl + `/groups/${req.params.id}/projects`;
  axios.get(url).then(({ data }) => {
    res.json(
      data.map(each => ({
        id: each.id,
        name: each.name,
        created_at: each.created_at,
        last_activity_at: each.last_activity_at,
        description: each.description,
        readme_url: each.readme_url,
        http_url_to_repo: each.http_url_to_repo,
        namespace_id: each.namespace.id,
        namespace_name: each.namespace.name,
        tags_list: each.tags_list,
        web_url: each.web_url
      }))
    );
  });
});

// Get a specific project
app.get("/projects/:id", (req, res) => {
  const url = config.gitlabAPIUrl + `/projects/${req.params.id}`;
  axios.get(url).then(({ data }) => {
    res.json({
      id: data.id,
      name: data.name,
      created_at: data.created_at,
      last_activity_at: data.last_activity_at,
      description: data.description,
      readme_url: data.readme_url,
      http_url_to_repo: data.http_url_to_repo,
      namespace_id: data.namespace.id,
      namespace_name: data.namespace.name,
      tags_list: data.tags_list,
      web_url: data.web_url
    });
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
