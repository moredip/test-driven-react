var _ = require('underscore');

var departure = function(params){
  return _.defaults(_.extend({},params), {
    dest_abbr: 'rich',
    route: 'RED',
    etd: 4
  });
}

module.exports = {
  departure: departure
};
