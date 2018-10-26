const router = require("express").Router();
const path = require("path");
const booksController = require("../controllers/booksController");


router.route("/api/books").get(booksController.findAllBooks);


// router.use("/api/books", function(req, res){

//         booksController.findAllBooks()

// });

router.use("/", function(req,res){

    res.sendFile(path.join(__dirname, "../client/build/index.html"));

});

module.exports = router;