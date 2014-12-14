'use strict';
angular.module('MainDirective').directive('jwPrettyprint',function(){
  return {
    restrict: 'C',
    link:  function($scope,element,attrs){
      trace($scope,element,attrs);
    },
  };
});