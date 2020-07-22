var React = require('react');

module.exports = Tweet = React.createClass({
    render: () => {
        var tweet = this.props.tweet;
        return (
            <li className={'tweet' + (tweet.active ? ' active' : '')}>
                <img src={tweet.avatar} className="avatar" />
                <blockquote>
                    <cite>
                        <a href={'http://twitter.com/' + tweet.screenname}>
                            {tweet.author}
                        </a>
                        <span className="content">{tweet.body}</span>
                    </cite>
                </blockquote>
            </li>
        );
    },
});
