/*global $:false */
'use strict';
angular.module('MainDirective').directive('postGallery',['trace',function(trace){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      var images;
      setTimeout(function(){
        images = $scope.post.images;
        setUpGallery(images);
      }, 100);
      
      var setUpGallery = function(array){
        trace(array);
      };

      trace($scope,element,attrs);
    }
  };
}]);