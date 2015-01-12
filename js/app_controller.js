var Q = require('Q');

var stationDetailsGenerator = function(stationRepo,etasRepo,stationId){
  return etasRepo.fetchEtasFor(stationId).then(function(etas){
    station = stationRepo.getStationById(stationId);
    return {
      station:station,
      etas:etas
    };
  });
}

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
    //return stationDetailsGenerator(stationRepo,etasRepo,stationId).then( function(stationAppState){
      //var appState = {station:stationAppState};
      //appRenderer(appState);
    //});
  };

  var appState = {
    stations: stations,
    onStationClicked: onStationClicked
  }

  appRenderer(appState);
}

module.exports = appController;
