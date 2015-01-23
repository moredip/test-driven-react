var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var appController = require('../../js/app_controller'),
    createStationRepo = require('../../js/station_repo');

var nullRenderer = _.identity,
    genericStationRepo = createStationRepo([]),
    dummyStationDetailsController = {
      appStateForStationWithId: _.constant(Q({}))
    },
    dummyEtasRepo = {
      fetchEtasFor: _.constant(Q([]))
    };

describe( 'appController', function(){

  it('loads stations from the station repo', function(){
    var spyStationsRepo = {
      getStations: sinon.spy()
    };

    appController({appRenderer:nullRenderer,stationRepo:spyStationsRepo});

    expect(spyStationsRepo.getStations).to.have.been.called;
  });

  it('passes stations from the repo into the app state', function(){
    var stationsFromRepo = [
          {name:"station one"},
          {name:"station two"}
        ],
        stationRepo = createStationRepo(stationsFromRepo),
        spyRenderer = sinon.spy();

    appController({appRenderer:spyRenderer,stationRepo:stationRepo});

    expect(spyRenderer).to.have.been.called;
    var appStatePassedToRenderer = spyRenderer.firstCall.args[0];
    expect( appStatePassedToRenderer ).to.have.property('stations');
    expect( appStatePassedToRenderer.stations ).to.equal(stationsFromRepo);
  });

  it('passes onStationClicked handler to app state', function(){
    var spyRenderer = sinon.spy();

    appController({appRenderer:spyRenderer,stationRepo:genericStationRepo});

    expect(spyRenderer).to.have.been.called;
    var appStatePassedToRenderer = spyRenderer.firstCall.args[0];
    expect( appStatePassedToRenderer ).to.have.property('onStationClicked');
    expect( appStatePassedToRenderer.onStationClicked ).to.satisfy(_.isFunction);
  });

  it('responds to a station being clicked by asking the station details controller for the corresponding app state for that station', function(){
    var spyRenderer = sinon.spy();
    var spyStationDetailsController = {
      appStateForStationWithId: sinon.stub().returns(Q({}))
    };

    appController({
      appRenderer:spyRenderer,
      stationRepo:genericStationRepo,
      stationDetailsController:spyStationDetailsController
      });

    expect(spyRenderer).to.have.been.calledOnce;

    var onStationClicked = spyRenderer.firstCall.args[0].onStationClicked;

    onStationClicked('some-station-id');

    expect(spyStationDetailsController.appStateForStationWithId).to.have.been.calledWith('some-station-id');
  });

  it('uses the station detail app state to re-render the app', function(){
    var spyRenderer = sinon.spy();
        stationDetailsAppState = {station:'details'},
        fakeStationDetailsController = {
      appStateForStationWithId: _.constant(Q(stationDetailsAppState))
    };

    appController({
      appRenderer:spyRenderer,
      stationRepo:genericStationRepo,
      stationDetailsController:fakeStationDetailsController
      });

    expect(spyRenderer).to.have.been.calledOnce;

    var onStationClicked = spyRenderer.firstCall.args[0].onStationClicked;

    return onStationClicked('blah').then(function(){
      expect(spyRenderer).to.have.been.calledTwice;
      var expectedAppState = {
        station: stationDetailsAppState
      };
      var appStatePassedToRendererTheSecondTime = spyRenderer.secondCall.args[0];
      expect(appStatePassedToRendererTheSecondTime).to.deep.equal(expectedAppState);
    });
  });
});
