/**
 * Module dependencies.
 */
 
var express = require('express'),
   request = require('request'),
   cheerio = require('cheerio'),
   jsdom = require('jsdom');
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
  jsdom.env({
  url: "http://weather.gc.ca/rss/city/sk-32_e.xml",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (errors, window) {
    var $ = window.$;
console.log('* * * * * * * * * *');
var count = 0;
var date = new Date();
$("entry").slice(2).each(function(){
var text = $(this).find('summary').html();
text = text.replace(/minus /gi, '-');
text = text.replace(/plus /gi, '+');

console.log('*');
console.log('high: ' + text.match(/high .*?\d+/gi));
console.log('low: ' + text.match(/(low )|(wind chill ).*?\d+/gi));
var day = $(this).find('title').html().match(/.*?:/gi)
console.log('date: ' + now() + ' plus ' + count + ' days');
console.log('info: ' + text);
count++;
});
  }
  });

  jsdom.env({
  url: "http://news.ycombinator.com/",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (errors, window) {
    var $ = window.$;
    console.log("HN Links");
    $("td.title:not(:last) a").each(function() {
      console.log(" -", $(this).text());
    });
  }
  });
  /*
        jsdom.env({
          url: "http://www.theweathernetwork.com/14-day-weather-trend/canada/saskatchewan/regina",
          scripts: ["http://code.jquery.com/jquery.js"],
          done: function (errors, window) {
            var $ = window.$;
            console.log("HN Links");
            $("td.title:not(:last) a").each(function() {
            console.log(" -", $(this).text());
          });
        }
        });

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
      }*/ 
    }
  );

 
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});