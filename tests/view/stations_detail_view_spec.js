var Helpers = require('./helpers');
var React = require('react/addons'),
TestUtils = React.addons.TestUtils,
sinon = require('sinon');


var StationDetailView = require('../../js/views/station_detail_view.jsx');

describe('StationDetailView', function(){
    it('displays the details of a station', function(){
        var props = {
            station: {
                id: 'abc',
                name: 'Some Station Name'
            }
        };

        var stationDetailView = Helpers.renderIsolatedReactComponent(StationDetailView, props);
        var $view = $(stationDetailView.getDOMNode());
        var $title = $view.find('h1');

        expect($title).to.exist;
        expect($title).to.have.text(props.station.name);
    });

    it('renders each entry in the etas list', function(){
        var props = {
            station: {
                id: 'blah',
                name: 'blah',
                etas: [
                  {cssClasses: "foo bar", departing: "1 min"},
                  {cssClasses: "baz", departing: "20 mins"}
                ]
            }
        };

        var stationDetailView = Helpers.renderIsolatedReactComponent(StationDetailView, props);
        var $view = $(stationDetailView.getDOMNode());
        var $departures = $view.find('.departure');

        expect($departures).to.have.length(2);
        expect($departures.eq(0)).to.have.class('foo');
        expect($departures.eq(0)).to.have.class('bar');
        expect($departures.eq(0)).to.have.text('1 min');
        expect($departures.eq(1)).to.have.class('baz');
        expect($departures.eq(1)).to.have.text('20 mins');
    });
});
