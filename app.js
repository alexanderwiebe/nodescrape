/**
 * Module dependencies.
 */
 
var express = require('express'),
   request = require('request'),
   cheerio = require('cheerio'),
   url = require('url'),
   http = require('http'),
   path = require('path')
;
 
var app = express();
 
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
 
app.configure('development', function(){
  app.use(express.errorHandler());
});
 
app.get('/nodetube', function(req, res){
  //Tell the request that we want to fetch youtube.com, send the results to a callback function
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});