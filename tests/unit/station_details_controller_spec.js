var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var createStationDetailsController = require('../../js/station_details_controller'),
    createStationRepo = require('../../js/station_repo');

var dummyEtasRepo = {
  fetchEtasFor: _.constant(Q([]))
};

describe( 'stationDetailsController', function(){
  it('exists and has the right API', function(){
    var stationDetailsController = createStationDetailsController({});
    expect(stationDetailsController).to.exist;
    expect(stationDetailsController).to.respondTo('appStateForStationWithId');
  });

  it('looks up the station and includes its name and id in the app state', function(){
    var someStation = { id: 'some-station-id', name: 'some-station-name' };
        stationRepo = createStationRepo([someStation]),
        stationDetailsController = createStationDetailsController({
          stationRepo:stationRepo,
          etasRepo: dummyEtasRepo
        });

    return stationDetailsController.appStateForStationWithId(someStation.id).then(function(appState){
      expect(appState).to.have.property('name',someStation.name);
      expect(appState).to.have.property('id',someStation.id);
    });
  });

  it('looks up the station etas and includes them in the app state', function(){
    var someStation = { id: 'some-station-id', name: 'some-station-name' };
        stationRepo = createStationRepo([someStation]),
        etasFromRepo = ['fake-eta-1','fake-eta-2'],
        etasRepo = {
          fetchEtasFor: _.constant(Q(etasFromRepo))
        },
        stationDetailsController = createStationDetailsController({
          stationRepo:stationRepo,
          etasRepo:etasRepo
        });

        return stationDetailsController.appStateForStationWithId(someStation.id).then( function(appState){
            expect(appState).to.have.property('etas',etasFromRepo);
        });
  });

  // it 'handles not finding a station in the station repo'
  // it 'handles not finding etas in the etas repo'
});
