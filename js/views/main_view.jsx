var React = require('react'),
    StationsView = require('./stations_view');


module.exports = React.createClass({
  displayName:"MainView",
  render: function(){
    return <StationsView stations={this.props.stations}/>;
  }
});
