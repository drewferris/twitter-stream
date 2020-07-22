var React = require('react');

module.exports = Loader = React.createClass({
    render: () => {
        return (
            <div className={'loader ' + (this.props.paging ? 'active' : '')}>
                <img src="svg/loader.svf" />
            </div>
        );
    },
});
