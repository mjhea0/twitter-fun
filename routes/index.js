var path = require("path");
var config = require('../oauth.js');
var twit = require('twit');

// twitter config
var twitter = new twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessKey,
  access_token_secret: config.twitter.accessSecret
})

exports.index = function(req, res){
  res.render('twit', { title: "Twitter Fun"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

exports.search = function(req, res){
  // search twitter api for friends
  var username = req.query.search;
  twitter.get('friends/list', { screen_name: username, count: 200 }, function(err, data){
    if(err) {
      res.send(err);
      return;
    };
    var friends = [];
    var test = [];
    for (var i = 0; i < (data.users).length ; i++) {
      // search twitter for info about the relationship between two users
      twitter.get('friendships/show', {source_screen_name: username, target_screen_name: data.users[i].screen_name}, 
        function(error, results){
          if(err) console.log("Error: ", err)
          // add friend to array
          friends.push(results.relationship.target.screen_name)
          // add whether that friend is following you to array
          friends.push((results.relationship.target.following).toString())
          test.push(results.relationship.target)
          // continue to loop until all data is added to the array
          if (friends.length === ((data.users).length + (data.users).length)) {
            res.send(test)
          };
        });
    };
  })
};
