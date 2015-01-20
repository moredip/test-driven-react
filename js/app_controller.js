var Q = require('Q');

var appController = function(deps){
  var appRenderer = deps.appRenderer,
      stationRepo = deps.stationRepo,
      stationDetailsController = deps.stationDetailsController,
      etasRepo = deps.etasRepo;

  var stations = stationRepo.getStations();

  var onStationClicked = function(stationId){
    return stationDetailsController.appStateForStationWithId(stationId).then(function(stationAppState){
      var appState = {
        station: stationAppState
      }
      appRenderer(appState);
    });
  };

  var appState = {
    stations: stations,
    onStationClicked: onStationClicked
  }

  appRenderer(appState);
}

module.exports = appController;
