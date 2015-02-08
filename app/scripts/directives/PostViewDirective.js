'use strict';
angular.module('MainDirective').directive('postView',['trace',function(trace){
  return {
    restrict: 'EA',
    templateUrl: '../views/post-view.html',
    link: function($scope,element,attrs){
      setTimeout(function(){
        var preObj = element.find('pre');
        for(var i = 0; i < preObj.length; i++){
          prettyPrint($(preObj[i]).html(),'',true);
          $('li.L1,li.L3,li.L5,li.L7,li.L9').css('background','none');
          $('pre').css('padding','15px 0');
        }
      },1000);
    }
  };
}]);