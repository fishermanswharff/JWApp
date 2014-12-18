/*global $:false */
'use strict';
angular.module('MainDirective').directive('postGallery',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    templateUrl: '../views/post-gallery.html',
    link: function($scope,element,attrs){
      
      var init = function(){
        // build the image gallery;
      };

      $timeout(function(){
        init();
      }, 100);

    }
  };
}]);