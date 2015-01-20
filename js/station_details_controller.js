var Q = require('q'),
    _ = require('underscore'),
    departurePresenter = require('./departure_presenter');

var createStationDetailsController = function(deps){
  var stationRepo = deps.stationRepo,
      etasRepo = deps.etasRepo;

  var appStateForStationWithId = function(stationId){
    return etasRepo.fetchEtasFor(stationId).then( function(etas){
      presentedEtas = _.map(etas,departurePresenter);
      var station = stationRepo.getStationById(stationId),
          stationAppState = {
            name: station.name,
            id: station.id,
            etas: presentedEtas
          };
      return stationAppState;
    });
  };

  return {
    appStateForStationWithId: appStateForStationWithId
  };
};

module.exports = createStationDetailsController;
