var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var appController = require('../../js/app_controller'),
    createStationRepo = require('../../js/station_repo');

var nullRenderer = _.identity,
    genericStationRepo = createStationRepo([]),
    dummyEtasRepo = {
      fetchEtasFor: _.constant(Q([]))
    };

describe( 'appController', function(){
  it('exists', function(){
    expect(appController).to.exist;
    expect(appController).to.satisfy(_.isFunction);
  });

  it('loads stations from the station repo', function(){
    var spyStationsRepo = {
      getStations: sinon.spy()
    };

    appController(nullRenderer,spyStationsRepo);

    expect(spyStationsRepo.getStations).to.have.been.called;
  });

  it('passes stations from the repo into the app state', function(){
    var stationsFromRepo = [
          {name:"station one"},
          {name:"station two"}
        ],
        stationRepo = createStationRepo(stationsFromRepo),
        spyRenderer = sinon.spy();

    appController(spyRenderer,stationRepo);

    expect(spyRenderer).to.have.been.called;
    var appStatePassedToRenderer = spyRenderer.firstCall.args[0];
    expect( appStatePassedToRenderer ).to.have.property('stations');
    expect( appStatePassedToRenderer.stations ).to.equal(stationsFromRepo);
  });

  it('passes onStationClicked handler to app state', function(){
    var spyRenderer = sinon.spy();

    appController(spyRenderer,genericStationRepo);

    expect(spyRenderer).to.have.been.called;
    var appStatePassedToRenderer = spyRenderer.firstCall.args[0];
    expect( appStatePassedToRenderer ).to.have.property('onStationClicked');
    expect( appStatePassedToRenderer.onStationClicked ).to.satisfy(_.isFunction);
  });

  it('responds to a station being clicked by showing station details for that station', function(){
    var stationsFromRepo = [
          {id: 's1', name:"station one"},
          {id: 's2', name:"station two"}
        ],
        targetStation = stationsFromRepo[1],
        stationRepo = createStationRepo(stationsFromRepo),
        spyRenderer = sinon.spy();

    appController(spyRenderer,stationRepo,dummyEtasRepo);
    expect(spyRenderer).to.have.been.calledOnce;

    var appStatePassedToRenderer = spyRenderer.firstCall.args[0];
    return appStatePassedToRenderer.onStationClicked(targetStation.id).then( function(){
      dummyEtasRepo.fetchEtasFor().then(function(){
        expect(spyRenderer).to.have.been.calledTwice;

        var appStatePassedToRendererTheSecondTime = spyRenderer.secondCall.args[0];

        expect( appStatePassedToRendererTheSecondTime ).not.to.have.property('stations');
        expect( appStatePassedToRendererTheSecondTime ).to.have.property('station');

        expect( appStatePassedToRendererTheSecondTime.station ).to.equal(targetStation);
      });
    });
  });

  it('loads etas from the eta_repo when showing station details', function(){
    var stationsFromRepo = [
          {id: 'a-station-id', name:"a station"}
        ],
        targetStation = stationsFromRepo[0],
        stationRepo = createStationRepo(stationsFromRepo),
        etasFromRepo = ['fake-eta-1','fake-eta-2'],
        etasRepo = {
          fetchEtasFor: _.constant(Q(etasFromRepo))
        },
        spyRenderer = sinon.spy();

    appController(spyRenderer,stationRepo,etasRepo);
    expect(spyRenderer).to.have.been.calledOnce;

    var appStatePassedToRenderer = spyRenderer.firstCall.args[0];
    return appStatePassedToRenderer.onStationClicked(targetStation.id).then( function(){
      var appStatePassedToRendererTheSecondTime = spyRenderer.secondCall.args[0];

      expect( appStatePassedToRendererTheSecondTime ).to.have.deep.property('station.etas',etasFromRepo);
    });
  });

});
