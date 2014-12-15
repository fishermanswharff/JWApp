'use strict';
angular.module('jwwebApp').filter('truncate',['trace',function(trace){
  return function(params){
    return params.slice(0, 100) + '...';
  };
}]);