'use strict';
angular.module('MainDirective').directive('jwNavbar',['trace',function(trace){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      $(element).on('click','a#menu-icon',function(e){
        $(this).toggleClass('active');
        $('nav.navbar').toggleClass('active');
      });
    }
  };
}]);