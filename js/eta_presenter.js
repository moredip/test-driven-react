/****************

SAMPLE ETA STRUCTURE:

{
  dest_abbr: 'EMBR',
  route: 'YELLOW',
  etd: 1
}

******************/

var presentEta = function(eta){
  var cssClasses = (eta.route||'').toLowerCase().concat('-route'),
      departing = (eta.etd||0).toString().concat(" mins");

  return {
    cssClasses: cssClasses,
    departing: departing
  };
};

module.exports = presentEta;
