'use strict';
angular.module('MainDirective').directive('homeSlider',['trace',function(trace){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      trace($scope,element,attrs);
    }
  };
}]);