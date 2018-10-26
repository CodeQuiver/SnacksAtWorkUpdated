const route = require('express').Router();
const mongoose = require("mongoose");
var db = require("./models");
mongoose.connect("mongodb://localhost/snacks");
import data from "../data/snacks.json";

// To add Products to the Products Database
// To add an item to the cart
route.post('/addtoproducts', (req, res) => {
    data.addToProducts(req.body.product);
res.redirect('/myapi/snacks');
});






// To get Products from the Products Database
route.get('/getproducts', (req, res) => {

    db.snacks.find({})
    .then(function(snack) {
      // If any Books are found, send them to the client
      res.json(snack);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
//     data.getProducts().then((products) => {
//     res.send(products);
// })
});







module.exports = route;

// this file is the route file for products