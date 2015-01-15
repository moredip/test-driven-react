var _ = require('underscore'),
    Q = require('q');


var urlForStationId = function(stationId){
  return "http://dude-wheres-my-bart.herokuapp.com/stations/".concat(stationId);
}

var createEtasRepo = function(ajaxClient){
  var fetchEtasFor = function(stationId){
    return ajaxClient
      .get(urlForStationId(stationId))
      .then(function(responseBody){
        return JSON.parse(responseBody);
      });
  };
  return {
    fetchEtasFor: fetchEtasFor
  };
};

module.exports = createEtasRepo;
