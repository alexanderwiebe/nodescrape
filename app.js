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
  var myHtml = ''
  request('http://www.theweathernetwork.com/14-day-weather-trend/canada/saskatchewan/regina', 
    function (error, response, html) { 
      if (!error && response.statusCode == 200) { 
        console.log(html);
        var $ = cheerio.load(html);
        var scrapedInfo = [];
        $('.trends-table tr').each(function(i, element){
          if(i !== 0){
            scrapedInfo[i] = {
              date:   $(this).find('td.date').html(),
              high:   $(this).find('td.high span').html(),
              low:    $(this).find('td.low span').html(),
              pop:    $(this).find('td.pop strong').html()
            };
          }
        });
        res.send('worked');
      } 
    }
  );
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});