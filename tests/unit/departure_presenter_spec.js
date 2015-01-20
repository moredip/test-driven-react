var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var departurePresenter = require('../../js/departure_presenter');

describe( 'Departure presenter', function(){
  it('maps route names to css class names', function(){
    var departure = {
      dest_abbr: "blah",
      route: "YELLOW",
      etd: 10
    };
    var presentation = departurePresenter(departure);

    expect(presentation).to.have.property('cssClasses','yellow-route');
  });

  it('has human-readable departure time', function(){
    var departure = {
      dest_abbr: "blah",
      route: "blah",
      etd: 10
    };
    var presentation = departurePresenter(departure);

    expect(presentation).to.have.property('departing','10 mins');
  });
});
