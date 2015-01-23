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
    destination: departure.dest_name
  };
};

module.exports = presentDeparture;
