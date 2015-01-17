var React = require('react'),
    _ = require('underscore'),
    MainView = require('./views/main_view'),
    appController = require('./app_controller'),
    createStationRepo = require('./station_repo'),
    ajaxClient = require('./ajax_client'),
    createEtasRepo = require('./etas_repo'),
    createStationDetailsController = require('./station_details_controller');

var boot = function(appContainer, deps){
  if( _.isUndefined(deps) ){
    deps = {};
  }
  
  if( _.isUndefined(appContainer) ){
    appContainer = document.getElementsByTagName('main')[0];
  }

  _.defaults(deps,{
    stationRepo: createStationRepo(),
    etasRepo: createEtasRepo(ajaxClient),
  });

  var stationDetailsController = createStationDetailsController({stationRepo:deps.stationRepo,etasRepo:deps.etasRepo});

  var appRenderer = function(appState){
    var theApp = React.createElement( MainView, appState );
    return React.render( theApp, appContainer );
  }

  appController({
    appRenderer:appRenderer,
    stationRepo:deps.stationRepo,
    stationDetailsController:stationDetailsController
  });
};

module.exports = boot;
