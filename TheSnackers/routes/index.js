var express = require('express');
var router = express.Router();
const path = require("path");

/* GET home page. */
router.use("/", function(req,res){

  res.sendFile(path.join(__dirname, "../client/public/index.html"));

});


router.use("/api/snacks", function(req, res) {
  // Grab every document in the Articles collection
  db.snacks.find({})
    .then(function(dbsnacks) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbsnacks);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
module.exports = router;
