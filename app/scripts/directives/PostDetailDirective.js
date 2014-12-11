'use strict';
angular.module('MainDirective').directive('jwPost',function(trace){
  return {
    restrict: 'EA',
    link: function($scope,element,attrs){
      setTimeout(function(){
        trace();
        $('.post').css('height',$('.post').height() + $('.post').find('.post-content').height() - $('.post').find('.post-content').offset());  
      },100);
      
      // trace($scope,element,attrs);
    }
  };
});