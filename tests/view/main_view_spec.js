var Helpers = require('./helpers');
var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    sinon = require('sinon');

var MainView = require('../../js/views/main_view.jsx'),
    StationsView = require('../../js/views/stations_view.jsx'),
    StationDetailView = require('../../js/views/station_detail_view.jsx');

describe('MainView', function(){
    it('defaults to rendering a stations view component', function(){
        var mainView = Helpers.renderIsolatedReactComponent(MainView);
        var stationsView = TestUtils.findRenderedComponentWithType(mainView, StationsView);
        expect(stationsView).to.exist;
    });

    it('renders a station detail view when a station is provided in the props', function(){
        var appState = {
            station: 'slime'
        };
        var mainView = Helpers.renderIsolatedReactComponent(MainView, appState);

        var stationDetailView = TestUtils.findRenderedComponentWithType(mainView, StationDetailView);
        expect(stationDetailView).to.exist;
    });

    it('renders a station detail view with station detail properties', function(){
        var appState = {
            station: {
                id: 'sid',
                name: 'station name'
            }
        };
        var mainView = Helpers.renderIsolatedReactComponent(MainView, appState);

        var stationDetailView = TestUtils.findRenderedComponentWithType(mainView, StationDetailView);
        var renderedStation = mainView.props.station;

        expect(renderedStation).to.exist;
        expect(renderedStation.id).to.equal(appState.station.id);
        expect(renderedStation.name).to.equal(appState.station.name);
    });

});
