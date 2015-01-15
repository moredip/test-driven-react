var React = require('react'),
    MainView = require('./views/main_view'),
    appController = require('./app_controller'),
    createStationRepo = require('./station_repo'),
    ajaxClient = require('./ajax_client'),
    createEtasRepo = require('./etas_repo'),
    createStationDetailsController = require('./station_details_controller');

var boot = function(appContainer){
  if( typeof appContainer === 'undefined' ){
    appContainer = document.getElementsByTagName('main')[0];
  }

  var stationRepo = createStationRepo(),
      etasRepo = createEtasRepo(ajaxClient),
      stationDetailsController = createStationDetailsController({stationRepo:stationRepo,etasRepo:etasRepo});

  var appRenderer = function(appState){
    var theApp = React.createElement( MainView, appState );
    return React.render( theApp, appContainer );
  }

  appController({
    appRenderer:appRenderer,
    stationRepo:stationRepo,
    stationDetailsController:stationDetailsController
  });
};

module.exports = boot;
