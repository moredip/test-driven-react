var Q = require('Q');

var stationDetailsGenerator = function(stationsRepo,etasRepo,stationId){
  return etasRepo.fetchEtasFor(stationId).then(function(etas){
    station = stationsRepo.getStationById(stationId);
    return {
      station:station,
      etas:etas
    };
  });
}

var appController = function(appRenderer, stationsRepo,etasRepo){
  var stations = stationsRepo.getStations();

  var onStationClicked = function(stationId){
    return stationDetailsGenerator(stationsRepo,etasRepo,stationId).then( function(stationAppState){
      var appState = {station:stationAppState};
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
