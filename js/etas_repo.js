var _ = require('underscore'),
    Q = require('q');

var createEtasRepo = function(){
  var fetchEtasFor = function(){
    return Q([]);
  };
  return {
    fetchEtasFor: fetchEtasFor
  };
};

module.exports = createEtasRepo;
