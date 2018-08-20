var express = require("express");
var app = express();

// on the request to root (localhost:3000/)
app.get("/", (req, res) => {
  res.send("My first express http server");
});

// On localhost:3000/welcome
app.get("/welcome", (req, res) => {
  res.send("Hello welcome to my http server made with express");
});

// Change the 404 message modifing the middleware
app.use((req, res, next) => {
  res.status(404).send("Not Found ! Sorry, that route doesn't exist.");
});

// start the server in the port 8080 !
app.listen(8080, () => {
  console.log("Example app listening on port 8080.");
});
