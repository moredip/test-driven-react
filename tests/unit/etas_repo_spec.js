var Helpers = require('./helpers'),
    _ = require('underscore');

var createEtasRepo = require('../../js/etas_repo');

describe('ETAs repo', function(){
  it('exists and has the right API', function(){
    var repo = createEtasRepo();
    expect(repo).to.exist;
    expect(repo).to.respondTo('fetchEtasFor');
  });

  it('returns a resolving promise of ETAs', function(done){
    var repo = createEtasRepo();
    repo.fetchEtasFor('blah').then( function(){
      done();
    });
  });

  // TODO: actually build out XHR gateway
});
