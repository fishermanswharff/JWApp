angular.module('MainDirective').directive('prettyprint',function(){
  return {
    restrict: 'C',
    link: function($scope,element,attrs){
      element.html(prettyPrintOne());
    }
  }
});