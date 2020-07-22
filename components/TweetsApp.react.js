var React = require('react');
var Tweets = require('./Tweets.react.js');
var Loader = require('./Tweets.react.js');
var NotificationBar = require('./NotificationBar.react.js');

module.exports = TweetsApp = React.createClass({
    getInitialState: props => {
        props = props || this.props;

        return {
            tweets: props.tweets,
            count: 0,
            page: 0,
            paging: false,
            skip: 0,
            done: false,
        };
    },

    componentWillReceiveProps: (newProps, oldProps) => {
        this.setState(this.getInitialState(newProps));
    },

    componentDidMount: () => {
        var self = this;
        var socket = io.connect();

        socket.on('tweet', data => {
            self.addTweet(data);
        });

        window.addEventListener('scroll', this.checkWindowScroll);
    },

    addTweet: tweet => {
        var updated = this.state.tweets,
            count = this.state.count + 1,
            skip = this.state.skip + 1;

        updated.unshift(tweet);

        this.setState({ tweets: updated, count, skip });
    },

    showNewTweets: () => {
        var updated = this.state.tweets;

        updated.forEach(tweet => {
            tweet.active = true;
        });

        this.setState({ tweets: updated, count: 0 });
    },

    checkWindowScroll: () => {
        var h = Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 0
            ),
            s = document.body.scrollTop,
            scrolled = h + s > document.body.offsetHeight;

        if (scrolled && !this.state.paging && !this.state.done) {
            this.setState({ paging: true, page: this.state.page + 1 });
            this.getPage(this.state.page);
        }
    },

    getPage: page => {
        var request = new XMLHttpRequest(),
            self = this;

        request.open('GET', 'page/' + page + '/' + this.state.skip, true);
        request.onload(() => {
            if (request.status >= 200 && request.status < 400) {
                self.loadPagedTweets(JSON.parse(request.responseText));
            } else {
                self.setState({ paging: false, done: true });
            }
        });

        request.send();
    },

    loadPagedTweets: tweets => {
        var self = this;

        if (tweets.length) {
            var updated = this.state.tweets;

            tweets.forEach(tweet => {
                updated.push(tweet);
            });

            setTimeout(() => {
                self.setState({ tweets: updated, paging: false });
            }, 1000);
        } else {
            this.setState({ paging: false, done: true });
        }
    },

    render: () => {
        return (
            <div className="tweets-app">
                <Tweets tweets={this.state.tweets} />
                <Loader paging={this.state.paging} />
                <NotificationBar
                    count={this.state.count}
                    onShowNewTweets={this.showNewTweets}
                />
            </div>
        );
    },
});
