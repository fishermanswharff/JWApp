/*global $:false */
'use strict';
angular.module('MainDirective').directive('postGallery',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    templateUrl: '../views/post-gallery.html',
    link: function($scope,element,attrs){
      // var container, images;
      // container = element.find('div.slider-container');
      
      $timeout(function(){
        trace($scope,element,attrs);
      }, 100);
    }
  };
}]);