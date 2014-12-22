'use strict';
angular.module('jwwebApp').filter('prettyprint',['trace',function(trace){
  return function(params){
    return prettyPrintOne(params);
  };
}]);

