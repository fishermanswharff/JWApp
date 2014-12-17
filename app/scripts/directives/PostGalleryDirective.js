/*global $:false */
'use strict';
angular.module('MainDirective').directive('postGallery',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      trace($scope,element,attrs);
      $timeout(function(){
        setUpGallery();
      }, 100);

      var setUpGallery = function(){
        trace($(element).children());
      };
    }
  };
}]);