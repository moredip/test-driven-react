require('./helpers');

var boot = require('../../js/boot');

describe('the main station list', function() {
  it('lists some stations', function() {
    appContainer = document.createElement('main');
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
});

