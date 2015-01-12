var Q = require('q');

var createStationDetailsController = function(deps){
  var stationRepo = deps.stationRepo;

  var appStateForStationWithId = function(stationId){
    var station = stationRepo.getStationById(stationId);
    var stationAppState = {
      name: station.name
    };
    return Q(stationAppState);
  };

  return {
    appStateForStationWithId: appStateForStationWithId
  };
};

module.exports = createStationDetailsController;
