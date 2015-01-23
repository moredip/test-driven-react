/****************

SAMPLE DEPARTURE STRUCTURE:

{
  dest_abbr: 'EMBR',
  route: 'YELLOW',
  etd: 1
}

******************/

var presentEtd = function(etd){
  if( etd === 0 ){
    return "now";
  }else if( etd === 1 ){
    return "1 min";
  }else{
    return etd.toString().concat(" mins");
  }
}

var presentDeparture = function(departure){
  return {
    destination: departure.dest_name,
    departing: presentEtd(departure.etd)
  };
};

module.exports = presentDeparture;
