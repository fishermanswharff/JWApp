'use strict';
angular.module('MainDirective').directive('postform',[function(){
  return {
    restrict: 'EA',
    templateUrl: '../views/post-form.html',
    link: function($scope,element,attrs){},
  };
}]);
