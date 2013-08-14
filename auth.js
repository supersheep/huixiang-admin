var db = require("./db");
var async = require("async");
var md5 = require('MD5');

function fobidden(req,res){
    if(req.xhr){
        res.send(403);
    }else{
        res.redirect('/login');
    }
}

exports.check = function(req,res,next){
    var cu = req.cookies.cu;

    if (!cu) {
        return fobidden(req,res);
    }

    db.query("select * from admin where token = ?",[cu],function(err,result){
        if(err){return res.send(500,err);}

        if(!result.length){
            return fobidden();
        }

        req.user = result[0];

        next();
    });
}

exports.login = function(req,res){
    var username = req.body.username;
    var password = md5(req.body.password);

    async.waterfall([function(done){
        var query = db.query("select * from admin where name = ? and password = ?",[username,password],function(err,result){
            if(err){return done(err);}
            if(!result.length){return res.send(403);}
            done(null,result[0]);
        });
    },function(user,done){
        var token = md5(user.name,user.password,+new Date());
        var query = db.query("update admin set token = ? where name = ?",[token, user.name],function(err){
            if(err){return done(err);}
            res.cookie("cu", token, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
            done(null);
        });
    }],function(err){
        if(err){return res.send(500,err);}
        res.send(200,"ok");
    });
}

exports.logout=function(req,res){
    res.clearCookie('cu');
    res.send(200);
}