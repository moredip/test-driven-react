var Helpers = require('./helpers');
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    sinon = require('sinon');


var StationsView = require('../../js/views/stations_view.jsx');

describe('StationsView', function(){
  it('defaults to showing an empty list', function(){
    var stationsView = Helpers.renderIsolatedReactComponent(StationsView);
    var $view = $(stationsView.getDOMNode());

    expect($view).to.match('ul');
    expect($view).not.to.have.descendants('li');
  });

  it('shows a list of station names when provided', function(){
    var props = {
      stations: [
        {name: "First Station"},
        {name: "Second Station"},
        {name: "Third Station"},
      ]
    };

    var stationsView = Helpers.renderIsolatedReactComponent(StationsView,props);
    var $view = $(stationsView.getDOMNode());
    var $stationItems = $view.find('.station');

    expect($stationItems.length).to.equal(3);
    expect($($stationItems[0])).to.have.text('First Station');
    expect($($stationItems[1])).to.have.text('Second Station');
    expect($($stationItems[2])).to.have.text('Third Station');
  });

  it('calls a handler whenever a station is clicked', function(){
    var props = {
      stations: [{
          name: 'Estazione',
          id: 'etsz'
      }],
      onStationClicked: sinon.spy()
    };

    var stationsView = Helpers.renderIsolatedReactComponent(StationsView,props);

    station = TestUtils.findRenderedDOMComponentWithClass( stationsView, 'station' );
    TestUtils.Simulate.click(station);

    expect(props.onStationClicked).to.have.been.calledWith(props.stations[0].id);
  });

});
