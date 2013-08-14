
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    auth = require('./auth'),
    routes = require("./routes"),
    path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 1943);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.cookieParser());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// pages
app.get('/', auth.check, routes.home);
app.get('/login',routes.login);


// piece api
app.del('/ajax/piece/:id', auth.check, routes.piece.del);

// login api
app.post('/ajax/user/login', auth.login);
app.post('/ajax/user/logout', auth.logout);





http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
