var Helpers = require('./helpers'),
    Q = require('Q'),
    _ = require('underscore'),
    React = require('react/addons'),
    TestUtils = React.addons.TestUtils;

var boot = require('../../js/boot');

describe('the main station list', function() {
  it('lists some stations', function() {
    var appContainer = document.createElement('main');
    boot(appContainer);

    expect($(appContainer)).to.exist;

    $stations = $(appContainer).find('.station');
    expect($stations).to.exist;

    var stationNames = $stations.map( function(){
      return $(this).text();
    }).toArray();

    expect(stationNames).to.include('Embarcadero');
    expect(stationNames).to.include('Civic Center');
    expect(stationNames).to.include('Bayfair');
  });

  it('shows station details when you click on a station', function(){
    var fakeEtaResponse = [
          {dest_abbr: 'EMBR', route: 'YELLOW', etd: 0},
          {dest_abbr: 'NBRK', route: 'RED', etd: 1},
          {dest_abbr: 'RICH', route: 'BLUE', etd: 12}
        ],
        fakeEtasRepo = {
          fetchEtasFor: _.constant(Q(fakeEtaResponse))
        },
        appContainer = document.createElement('main');

    boot(appContainer,{etasRepo:fakeEtasRepo});

    expect($(appContainer)).to.exist;

    $listingForBayfairStation = $(appContainer).find('.station').filter( function(){ 
      return $(this).text() == 'Bayfair'; 
    })[0];

    expect($listingForBayfairStation).to.exist;

    TestUtils.Simulate.click($listingForBayfairStation);

    // NO!!!!! replace with spin-assert
    return Q.delay(50).then(function(){
      $stationDetailsTitle = $(appContainer).find('h1');
      expect($stationDetailsTitle).to.exist;
      expect($stationDetailsTitle).to.have.text('Bayfair');

      $departures = $(appContainer).find('.departure');
      expect($departures).to.have.length(3);
    });
  });
});

