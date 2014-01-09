var path = require("path");

exports.index = function(req, res){
  res.render('twit', { title: "Twitter Fun"});
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};
