var db = require("../db");

module.exports = function(req, res){

    db.query("select * from piece",function(err,result){
        if(err){
            return res.send(500,err);
        }
        res.render('index', {
          pieces:result
        });
    });
}