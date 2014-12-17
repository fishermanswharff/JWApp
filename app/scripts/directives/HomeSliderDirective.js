'use strict';
angular.module('MainDirective').directive('homeSlider',['trace',function(trace){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      element.bind('click',function(){
        trace('hello world');
      });
    }
  };
}]);