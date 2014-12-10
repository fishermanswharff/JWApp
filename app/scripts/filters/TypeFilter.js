'use strict';
angular.module('jwwebApp').filter('truncate',function(trace){
  return function(params){
    trace(params.length);
  };
});