const express = require('express');
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const routes = require('./routes');
const db = require('./models');
const mongoose = require("mongoose");

var port = process.env.PORT || 3008;
var router = express.Router();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(cors());

app.use(routes);

mongoose.connect("mongodb://localhost/snacks");

app.get("/books", function(req, res) {
  // Using our Book model, "find" every book in our db
  db.snacks.find({})
    .then(function(snack) {
      // If any Books are found, send them to the client
      res.json(snack);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

app.listen(port, () => {
	console.log(`🌎 ==> Server now on port ${port}!`);
  });