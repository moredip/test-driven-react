var Q = require('q');

var createStationDetailsController = function(deps){
  var stationRepo = deps.stationRepo,
      etasRepo = deps.etasRepo;

  var appStateForStationWithId = function(stationId){
    return etasRepo.fetchEtasFor(stationId).then( function(etas){
      var station = stationRepo.getStationById(stationId),
          stationAppState = {
            name: station.name,
            id: station.id,
            etas: etas
          };
      return stationAppState;
    });
  };

  return {
    appStateForStationWithId: appStateForStationWithId
  };
};

module.exports = createStationDetailsController;
