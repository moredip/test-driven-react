var _ = require('underscore');

var DEFAULT_STATIONS = [
    {id:"embr", name:"Embarcadero"},
    {id:"plza", name:"El Cerrito Plaza"},
    {id:"nbrk", name:"North Berkeley"},
    {id:"dbrk", name:"Downtown Berkeley"},
    {id:"civc", name:"Civic Center"},
    {id:"bayf", name:"Bayfair"}
];

var createStationRepo = function(stations){
  stations = stations || DEFAULT_STATIONS;

  var getStations = function(){
    return stations;
  };

  var getStationById = function(stationId){
    return _.findWhere(stations, {id: stationId});
  };

  return {
    getStations:getStations,
    getStationById: getStationById
  };
};

module.exports = createStationRepo;
