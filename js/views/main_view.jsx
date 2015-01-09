var React = require('react'),
    _ = require('underscore'),
    StationDetailView = require('./station_detail_view'),
    StationsView = require('./stations_view');


module.exports = React.createClass({
  displayName:"MainView",
  render: function(){
    if(this.props.station){
        return <StationDetailView {...this.props}/>;
    }
    else {
        return <StationsView {...this.props}/>;
    }
  }
});
