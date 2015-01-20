/****************

SAMPLE DEPARTURE STRUCTURE:

{
  dest_abbr: 'EMBR',
  route: 'YELLOW',
  etd: 1
}

******************/

var presentDeparture = function(departure){
  return {
    cssClasses: departure.route.toLowerCase().concat('-route'),
    departing: departure.etd.toString().concat(" mins")
  };
};

module.exports = presentDeparture;
