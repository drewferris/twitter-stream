var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  twid: String,
  active: Boolean,
  author: String,
  avatar: String,
  body: String,
  date: Date,
  screenname: String,
});

schema.statics.getTweets = (page, skip, callback) => {
  var tweets = [],
    start = page * 10 + skip * 1;

  Tweet.find({}, 'twid active author avatar body date screenname', {
    skip: start,
    limit: 10,
  })
    .sort({ date: 'desc' })
    .exec((err, docs) => {
      if (!err) {
        tweets = docs;
        tweets.forEach(tweet => {
          tweet.active = true;
        });
      }

      callback(tweets);
    });
};

module.exports = Tweet = mongoose.model('Tweet', schema);
