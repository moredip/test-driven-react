var appController = function(appRenderer, stationsRepo){
  var stations = stationsRepo.getStations();

  var onStationClicked = function(stationId){
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
