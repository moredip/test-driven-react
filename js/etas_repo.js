var _ = require('underscore'),
    Q = require('q');


var urlForStationId = function(stationId){
  return "http://dude-wheres-my-bart.herokuapp.com/stations/".concat(stationId);
}

var createEtasRepo = function(ajax){
  var fetchDeparturesFor = function(stationId){
    return ajax('http://api.nxtbrt.com/departures/'.concat(stationId)).then( function(response){
      return JSON.parse(response);
  });
  };

  return {
    fetchDeparturesFor: fetchDeparturesFor
  };
};

module.exports = createEtasRepo;
