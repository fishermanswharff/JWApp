'use strict';
angular.module('MainDirective').directive('jwPost',[function(){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      setTimeout(function(){
        $('.post').css('height',$('.post').height() + $('.post').find('.post-content').height() - $('.post').find('.post-content').offset());
      },100);
    }
  };
}]);