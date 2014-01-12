var oauth = require('./oauth.js');
var twit = require('twit');

// twitter oauth
module.exports = new twit({
  consumer_key: oauth.twitter.consumerKey,
  consumer_secret: oauth.twitter.consumerSecret,
  access_token: oauth.twitter.accessKey,
  access_token_secret: oauth.twitter.accessSecret
})
