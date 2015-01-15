// based on https://gist.github.com/kriskowal/593076

var Q = require("q");

var get = function (url, timeout) {
  var response = Q.defer();
  var request = new XMLHttpRequest(); // ActiveX blah blah
  request.open("GET", url, true);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        response.resolve(request.responseText);
      } else {
        response.reject("HTTP " + request.status + " for " + url);
      }   
    }
  };
  timeout && setTimeout(response.reject, timeout);
  request.send('');
  return response.promise;
};

module.exports = {
  get: get
};
