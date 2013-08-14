var mysql = require("mysql");
var dbConfig = require("./config.json").db;

exports.query = function () {
    var connection = mysql.createConnection(dbConfig);

    connection.connect();
    var args = Array.prototype.slice.apply(arguments);
    var oldcb = args[args.length - 1];
    args[args.length - 1] = function(err,result){
        oldcb(err,result);
        connection.end();
    };

    var query = connection.query.apply(connection, args);

    console.log(query.sql);
    return query;
};