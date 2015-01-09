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
        var $stationDetailNode = $(stationDetailView.getDOMNode());

        expect($stationDetailNode).to.match('h1');
        expect($stationDetailNode).to.have.text(props.station.name);
    });

});
