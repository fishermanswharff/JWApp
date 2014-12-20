/*global $:false */
'use strict';
angular.module('MainDirective').directive('contactForm',['trace','$http','ServerUrl','$q',function(trace,$http,ServerUrl,$q){
  return {
    restrict: 'EA',
    templateUrl: '../views/contact-form.html',
    link: function($scope,element,attrs){
      
    },
  };
}]);