var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var createStationDetailsController = require('../../js/station_details_controller'),
    createStationRepo = require('../../js/station_repo');

describe( 'stationDetailsController', function(){
  it('exists and has the right API', function(){
    var stationDetailsController = createStationDetailsController({});
    expect(stationDetailsController).to.exist;
    expect(stationDetailsController).to.respondTo('appStateForStationWithId');
  });

  it('looks up the station name and includes it in the app state', function(){
    var someStation = { id: 'some-station-id', name: 'some-station-name' };
        stationRepo = createStationRepo([someStation]),
        stationDetailsController = createStationDetailsController({stationRepo:stationRepo});

    return stationDetailsController.appStateForStationWithId(someStation.id).then(function(appState){
      expect(appState).to.have.property('name',someStation.name);
    });
  });

  it('looks up the station etas and includes them in the app state', function(){
    I AM HERE
  });


  // it 'handles not finding a station in the repo'
});
