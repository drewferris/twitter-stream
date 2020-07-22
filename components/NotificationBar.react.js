var React = require('react');

module.exports = NotificationBar = React.createClass({
    render: () => {
        var count = this.props.count;
        return (
            <div className={'notification-bar' + (count > 0 ? ' active' : '')}>
                <p>
                    There are {count} new tweets!{' '}
                    <a href="#top" onClick={this.props.onShowNewTweets}>
                        Click to see them.
                    </a>{' '}
                </p>
            </div>
        );
    },
});
