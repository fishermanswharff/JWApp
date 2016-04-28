'use strict';
angular.module('MainDirective').directive('postViewForm',['trace',function(trace){
  return {
    restrict: 'EA',
    templateUrl: '../views/post-view-form.html',
    link: function($scope,element,attrs){}
  };
}]);
