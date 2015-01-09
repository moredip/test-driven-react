var Helpers = require('./helpers'),
    _ = require('underscore');

var createStationRepo = require('../../js/station_repo');

var verifyLooksLikeStation = function(station){
  var expectedProperties = ["name","id"];
  _.each(expectedProperties,function(prop){
    expect(station[prop]).not.to.be.empty;
  });
};

describe( 'station repo', function(){

  it('returns a list of stations', function(){
    var repo = createStationRepo();
    var stations = repo.getStations();

    expect(stations).not.to.be.empty;
    _.each( stations, verifyLooksLikeStation );

    var stationNames = _.pluck( stations, "name" );

    expect(stationNames).to.include.members(["Embarcadero","El Cerrito Plaza","North Berkeley"]);
  });

  it('looks up an individual station', function(){
    var repo = createStationRepo();
    var station = repo.getStationById('nbrk');

    expect(station).to.exist;
    verifyLooksLikeStation(station);
    expect(station.name).to.equal("North Berkeley");

  });

  it('return undefined when looking up an non existing station', function(){
    var repo = createStationRepo();
    var nonStation = repo.getStationById('lol');
    expect(nonStation).to.be.undefined;
  });

});
