var db = require("../db");
var async = require("async");

exports.del = function(req,res){
    var id = req.params.id;

    async.waterfall([function(done){
        db.query("delete from fav where pieceid = " + id,function(err,result){
            if(err){return done(err);}
            done(null);
        });
    },function(done){
        db.query("delete from piece where id = " + id,function(err,result){
            if(err){return done(err);}
            done(null);
        });
    }],function(){
        res.send(200,"ok");     
    });

};