// Global configuration
const port: number = Number(process.env.PORT) || 3000;
const gitlabAPIUrl: string = "https://gitlab.com/api/v4";

// Http promise requests
import * as axios from "axios";

// Express Html Application
import * as express from "express";
const app: express.Application = express.default();

// Requests Logger Middleware
import * as morgan from "morgan";
app.use(morgan.default("tiny"));

// Function to add API Url to a partial path
const api = (path: string) => gitlabAPIUrl + path;

// Open API CORS Headers
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  }
);

// Get a specific group with subgroups
app.get("/groups/:id", (req: express.Request, res: express.Response) => {
  Promise.all([
    axios.default.get(api(`/groups/${req.params.id}`)),
    axios.default.get(api(`/groups/${req.params.id}/subgroups`))
  ]).then(([{ data }, groups]) => {
    // Add groups params to data
    data.groups = groups.data;

    // Rename param projects to texts
    data.texts = data.projects;
    delete data.projects;

    // Send response
    res.json(data);
  });
});

// Get a specific texot
app.get("/texts/:id", (req: express.Request, res: express.Response) => {
  axios.default
    .get(api(`/projects/${req.params.id}`))
    .then(({ data }) => res.json(data));
});

// Error 404 Middleware
app.use((req: express.Request, res: express.Response) => {
  res.status(404).send("Not Found");
});

// Start Html Server
app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
