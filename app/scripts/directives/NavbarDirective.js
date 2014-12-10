'use strict';
angular.module('MainDirective').directive('jwNavbar',function(trace){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      $().on('click',,function(e){
        $("nav.navbar").toggleClass("active");
      });
    }
  }
});