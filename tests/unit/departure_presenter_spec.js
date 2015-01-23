var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var departurePresenter = require('../../js/departure_presenter');

describe( 'Departure presenter', function(){
  it('presents the destination', function(){
    // Given
    var departure = {
      dest_name: "Ontario",
      etd: 10
    };
    
    // When
    var presentation = departurePresenter(departure);
    
    // Then
    expect(presentation).to.have.property('destination','Ontario');
  });
  























  //it('has human-readable departure time', function(){
    //// Given
    //var departure = {
      //dest_abbr: "blah",
      //etd: 10
    //};
    //var presentation = departurePresenter(departure);

    //expect(presentation).to.have.property('departing','10 mins');
  //});
});
