const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const db = require("./models");

mongoose.connect("mongodb://localhost/mybooksdb");


const bookSeedData = [
  {
    title: "Inferno",
    author: "Dan Brown"
  },
  {
    title: "To kill a mockingbird",
    author: "Harper Lee"
  }
];

db.Book.remove({}).then(() => db.Book.collection.insertMany(bookSeedData)).then(data => console.log(data)).catch(err => console.log(err));

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
