/*global $:false */
'use strict';
angular.module('MainDirective').directive('postGallery',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      var container, images;
      container = element.find('div.slider-container');
      images = element.find('img');
      
      
    }
  };
}]);