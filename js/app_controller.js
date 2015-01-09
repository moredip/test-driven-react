var appController = function(appRenderer, stationsRepo,etasRepo){
  var stations = stationsRepo.getStations();

  var onStationClicked = function(stationId){
    etas = etasRepo.fetchEtasFor(stationId);
    var appState = { station: stationsRepo.getStationById(stationId) };
    appRenderer(appState);
  };

  var appState = {
    stations: stations,
    onStationClicked: onStationClicked
  }

  appRenderer(appState);
}

module.exports = appController;
