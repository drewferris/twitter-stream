var React = require('react');
var Tweet = require('./Tweet.react.js');

module.exports = Tweets = React.createClass({
    render: () => {
        var content = this.props.tweets.map(tweet => {
            return <Tweet key={tweet.twid} tweet={tweet} />;
        });

        return <ul className="tweets">{content}</ul>;
    },
});
