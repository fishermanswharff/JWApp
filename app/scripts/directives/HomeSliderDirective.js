/*global $:false */
'use strict';
angular.module('MainDirective').directive('homeSlider',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      var select = element.find('select');
      var input = element.find('input');
      $timeout(function(){}, 500);
      var openInput = function(){
        $(select).show();
        $(select)[0].size = $(select)[0].length;
        $(select).css('box-shadow','0 0 10px #000');
      };
      var touchSelect = function(){
        $(select).hide();
      };
      input.bind('click',openInput);
      select.bind('click',touchSelect);
    }
  };
}]);