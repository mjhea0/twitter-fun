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

//routes
app.get('/ping', routes.ping);
app.get('/', routes.index);
app.get('/searching', function(req, res){
  // search twitter api for friends
  var username = req.query.search;
  twitter.get('friends/list', { screen_name: username, count: 200 }, function(err, data){
    if(err) console.log("Error: ", err)
    var friends = [];
    for (var i = 0; i < (data.users).length ; i++) {
      // search twitter for info about the relationship between two users
      twitter.get('friendships/show', {source_screen_name: username, target_screen_name: data.users[i].screen_name}, 
        function(error, results){
          if(err) console.log("Error: ", err)
          // add friend to array
          friends.push(results.relationship.target.screen_name)
          // add whether that friend is following you to array
          friends.push((results.relationship.target.following).toString())
          // continue to loop until all data is added to the array
          if (friends.length === ((data.users).length + (data.users).length)) {
            res.send(friends)
          };
        });
    };
  })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("\nExpress server listening on port " + app.get('port'));
});
