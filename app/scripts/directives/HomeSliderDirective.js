/*global $:false */
'use strict';
angular.module('MainDirective').directive('homeSlider',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      // trace($scope,element,attrs);
      $timeout(function(){
        // trace($(element).find('.withImage'));  
      }, 200);
      
      element.bind('click',function(){
        trace('hello world');
      });
    }
  };
}]);