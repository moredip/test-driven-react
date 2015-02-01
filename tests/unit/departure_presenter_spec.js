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
    var viewModel = departurePresenter(departure);
    
    // Then
    expect(viewModel).to.have.property('destination','Ontario');
  });
  
  it('presents an etd of 10 correctly', function(){
    // Given
    var departure = {
      dest_name: "blah",
      etd: 10
    };
    
    // When
    var viewModel = departurePresenter(departure);
    
    // Then
    expect(viewModel).to.have.property('departing','10 mins');
  });


























  //it('presents the departure time for "10 mins"', function(){
    //// Given
    //var departure = {
      //dest_name: "blah",
      //etd: 10
    //};
    
    //// When
    //var viewModel = departurePresenter(departure);
    
    //// Then
    //expect(viewModel).to.have.property('departing','10 mins');
  //});
  
  //it('presents the departure time for "1 min"', function(){
    //// Given
    //var departure = {
      //dest_name: "blah",
      //etd: 1
    //};
    
    //// When
    //var viewModel = departurePresenter(departure);
    
    //// Then
    //expect(viewModel).to.have.property('departing','1 min');
  //});

  //it('presents the departure time for "now"', function(){
    //// Given
    //var departure = {
      //dest_name: "blah",
      //etd: 0
    //};
    
    //// When
    //var viewModel = departurePresenter(departure);
    
    //// Then
    //expect(viewModel).to.have.property('departing','now');
  //});

});
