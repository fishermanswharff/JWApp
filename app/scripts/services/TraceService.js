'use strict';
angular.module('jwwebApp').factory('trace',[function(){
  return function trace(){
    for(var i = 0; i < arguments.length; i++){
      console.log(arguments[i]);
    }
  };
}]);
