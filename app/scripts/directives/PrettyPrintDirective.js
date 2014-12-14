'use strict';
angular.module('MainDirective').directive('jwPrettyprint',function(){
  return {
    restrict: 'C',
    link:  function postLink($scope,element,attrs){
      trace($scope,element,attrs);
      
      setTimeout(function(){
        element.html(prettyPrintOne(replaceText(element.html()),'',true));
      }, 100);
      
    },
  };
});