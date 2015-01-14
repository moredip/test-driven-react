var React = require('react');

module.exports = React.createClass({
  displayName:"StationDetailView",
  render: function(){
      var station = this.props.station;
      return <h1 className="station-details" key="{station.id}">{station.name}</h1>;
  }
});
