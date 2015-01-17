var React = require('react'),
    _ = require('underscore');

module.exports = React.createClass({
  displayName:"StationDetailView",
  render: function(){
    var station = this.props.station;
    var departures = _.map( station.etas, function(eta){
      return <li className={"departure ".concat(eta.cssClasses)}>
        {eta.departing}
      </li>;
    });
    return (
      <section className="station-details">
        <h1 key="{station.id}">{station.name}</h1>
        <ul>
          {departures}
        </ul>
      </section>
    );
  }
});
