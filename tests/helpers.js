var chaiThings = require('chai-things'),
    chaiAsPromised = require('chai-as-promised'),
    sinonChai = require('sinon-chai');

(function(global){
  if( typeof global.chai == 'undefined' ) global.chai = require('chai');

  global.expect = global.chai.expect;

  global.chai.use( chaiThings );
  global.chai.use( chaiAsPromised );
  global.chai.use( sinonChai );
})(global||window);

