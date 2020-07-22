var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  Tweet = require('./components/Tweet');

module.exports = {
  index: (req, res) => {
    Tweet.getTweets(0, 0, () => {
      var markup = React.renderToString(
        TweetsApp({
          tweets,
        })
      );

      res.render('home', {
        markup,
        state: JSON.stringify(tweets),
      });
    });
  },

  page: (req, res) => {
    Tweet.getTweets(req.params.page, req.params.skip, tweets => {
      res.send(tweets);
    });
  },
};
