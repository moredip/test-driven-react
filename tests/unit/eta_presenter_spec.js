var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var etaPresenter = require('../../js/eta_presenter');

describe( 'ETA presenter', function(){
  it('maps route names to css class names', function(){
    var eta = {
      dest_abbr: "blah",
      route: "YELLOW",
      etd: 10
    };
    var presentation = etaPresenter(eta);

    expect(presentation).to.have.property('cssClasses','yellow-route');
  });

  it('has human-readable departure time', function(){
    var eta = {
      dest_abbr: "blah",
      route: "blah",
      etd: 10
    };
    var presentation = etaPresenter(eta);

    expect(presentation).to.have.property('departing','10 mins');
  });
});
