var Helpers = require('./helpers'),
    _ = require('underscore'),
    Q = require('q'),
    sinon = require('sinon');

var createEtasRepo = require('../../js/etas_repo');

var dummyAjaxClient = {
  get: _.constant(Q("[]"))
};

describe('ETAs repo', function(){
  it('exists and has the right API', function(){
    var repo = createEtasRepo(dummyAjaxClient);
    expect(repo).to.exist;
    expect(repo).to.respondTo('fetchEtasFor');
  });

  it('returns a resolving promise of ETAs', function(done){
    var repo = createEtasRepo(dummyAjaxClient);
    repo.fetchEtasFor('blah').then( function(){
      done();
    });
  });

  it('makes an XHR call to the right url', function(){
    var fakeAjaxClient = {
          get: sinon.stub().returns(Q("[]"))
        },
        repo = createEtasRepo(fakeAjaxClient);

    repo.fetchEtasFor('a-station-id');

    var expectedUrl = "http://dude-wheres-my-bart.herokuapp.com/stations/a-station-id";
    expect(fakeAjaxClient.get).to.have.been.calledWith(expectedUrl);
  });

  it('parses the XHR response', function(){
    var fakeAjaxClient = {
          get: _.constant(Q("[1,2,3,\"a\",\"b\"]"))
        };
        repo = createEtasRepo(fakeAjaxClient);

    return repo.fetchEtasFor('blah').then(function(etas){
      expect(etas).to.deep.equal([1,2,3,"a","b"]);
    });
  });

  // handle error

  // request json in header

});
