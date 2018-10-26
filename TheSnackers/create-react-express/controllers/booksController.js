const db = require("../models");

module.exports = {
findAllBooks : function(req, res){
    db.Book.find(req.query).then(dbModel => res.json(dbModel)).catch(err => res.status(500).json(err));

}
};


