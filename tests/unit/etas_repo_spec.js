var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var createDeparturesGateway = require('../../js/etas_repo');

describe('Departures Gateway', function(){
  it( 'makes an ajax call to the correct url', function(){
    //var fakeAjaxFn = sinon.spy();
    var fakeAjaxFn = sinon.stub().returns(Q("[]"));

    var departuresGateway = createDeparturesGateway(fakeAjaxFn);
    departuresGateway.fetchDeparturesFor('a-station-id');

    expect(fakeAjaxFn).to.have.been.calledWith('http://api.nxtbrt.com/departures/a-station-id');
  });

  it( 'parses the AJAX response as JSON', function(){
    var fakeAjaxResponse = '{ "some":"json" }';
    var fakeAjaxResponsePromise = Q(fakeAjaxResponse);
    var fakeAjaxFn = function(){ 
      return fakeAjaxResponsePromise; 
    };

    var departuresGateway = createDeparturesGateway(fakeAjaxFn);
    var departuresPromise = departuresGateway.fetchDeparturesFor('blah');

    return expect(departuresPromise)
      .to.eventually
      .deep.equal({some:"json"});
  });

});
