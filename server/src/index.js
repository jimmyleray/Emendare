// Global configuration
const config = require("./config");

// Express Html Application
const express = require("express");
const app = express();

// Requests Logger Middleware
const morgan = require("morgan");
app.use(morgan("tiny"));

// JSON Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// CORS Definition
const cors = require("cors");
app.use(cors());

// MongoDB connection
const database = require("./mongo");

// MongoDB models
const User = require("./mongo/models/user");
const Group = require("./mongo/models/group");

// Users routes
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  if (await User.findOne({ email })) {
    res.status(400).end("Cet email est déjà utilisé");
  } else {
    await new User({ email, password }).save().then(() => {
      res.end("Nouvel utilisateur enregistré");
    });
  }
});

// Utils function to generate unique tokens
const generateToken = require("./utils/token");

app.post("/login", async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    const token = generateToken();
    user.token = token;
    await user.save();
    res.end(token);
  } else {
    res.status(400).end("Mot de passe et/ou email invalide");
  }
});

app.post("/logout", async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });
  if (user) {
    user.delete("token");
    await user.save();
    res.end("Utilisateur déconnecté");
  } else {
    res.status(400).end("Cet utilisateur est déjà déconnecté");
  }
});

// User routes
app.post("/user/email", async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });
  if (user) {
    res.end(user.email);
  } else {
    res.status(400).end("Cet utilisateur n'est pas connecté");
  }
});

// Groups routes
app.get("/groups", async (req, res) => {
  res.json(await Group.find()).end();
});

app.get("/groups/:id", async (req, res) => {
  res.json(await Group.findById(req.params.id)).end();
});

// Error 404 Middleware
app.use((req, res) => {
  res.status(404).end();
});

// Start Http Server
app.listen(config.port, () => {
  console.log(`Server start and listening on port ${config.port}`);
});
