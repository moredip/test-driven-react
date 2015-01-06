var React = require('react'),
    _ = require('underscore');

module.exports = React.createClass({
  displayName:"StationsView",
  render: function(){
    var onStationClicked = this.props.onStationClicked;
    var stationNodes = _.map( this.props.stations, function(station){
      var clickHandler = _.partial(onStationClicked,station.id);
      return <li className="station" key={station.id} onClick={clickHandler}>{station.name}</li>;
    });
    return (
      <ul>
        {stationNodes}
      </ul>
    );
  }
});
