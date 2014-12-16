'use strict';
angular.module('jwwebApp').filter('truncate',['trace',function(trace){
  return function(params){
    trace();
    return params.slice(0, 150) + '...';
  };
}]);