var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var twit = require('twit');
var config = require('./oauth.js');
var app = express();

// twitter config
var twitter = new twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessKey,
  access_token_secret: config.twitter.accessSecret
})

app.configure(function(){
  app.set('port', process.env.PORT || 1337);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser()); 
  app.use(express.session({secret: "hodgehoDgepodge"}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
app.get('/ping', routes.ping);
app.get('/', function(req, res){
  res.render('twit', { title: "Twitter Fun"});
});
app.get('/searching', function(req, res){
  console.log(req.query.search)
  twitter.get('friends/list', { screen_name: req.query.search, count: 200 }, function(err, data){
    if(err) {console.log("Error ? -", err)}
    console.log((data.users).length)
    var friends;
    for (var i = 0; i < (data.users).length ; i++) {
      friends.push(data.users[i].screen_name)
      console.log(friends)
    };
    var test = data.users
    res.send(test)
  })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("\nExpress server listening on port " + app.get('port'));
});
