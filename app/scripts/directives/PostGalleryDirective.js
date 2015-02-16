/*global $:false */
'use strict';
angular.module('MainDirective').directive('postGallery',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    templateUrl: '../views/post-gallery.html',
    link: function($scope,element,attrs){

      var Gallery = {
        imgContainer: element.find('.slider-photos'),
        images: [],
        currentIndex: 0,
        containerWidth: element.find('.slider-container').width(),
      };

      Gallery.init = function(){
        TweenLite.to(element.find('.slider-photos'),0.5,{opacity: '1'});
        Gallery.images = element.find('.slider-photos img');
        Gallery.positionImages();
        Gallery.addEventListeners();
      };

      Gallery.addEventListeners = function(){
        $(element).on('click','a',function(e){
          Gallery.clickHandler(e);
        });
      };

      Gallery.positionImages = function(){
        var images = Gallery.images;
        var width = Gallery.containerWidth;
        for(var i = 0; i < images.length; i++){
          var photoPosition = i * width;
          $(images[i]).css('width',width+'px').css('left',photoPosition+'px').css('top','0px');
          $('.slider-photos').css('width',photoPosition+width+'px');
        }
      };

      Gallery.setCurrentIndex = function(index){
        Gallery.currentIndex = index;
        if(Gallery.currentIndex > Gallery.images.length - 1) Gallery.currentIndex = 0;
        else if (Gallery.currentIndex < 0) Gallery.currentIndex = Gallery.images.length - 1;
      };

      Gallery.clickHandler = function(e){
        switch($(e.currentTarget).attr('class')) {
          case 'slider-nav prev':
            Gallery.setCurrentIndex(Gallery.currentIndex - 1);
            break;
          case 'slider-nav next':
            Gallery.setCurrentIndex(Gallery.currentIndex + 1);
            break;
          default:
            break;
        }
        Gallery.updateView();
      };

      Gallery.updateView = function(){
        var prevIndex = Gallery.currentIndex - 1;
        var nextIndex = Gallery.currentIndex + 1;
        if(prevIndex < 0) prevIndex = Gallery.images.length - 1;
        if(nextIndex > Gallery.images.length - 1) nextIndex = 0;
        var tl = new TimelineMax({align: 'start'});
        tl.add([
          TweenLite.to(Gallery.images[prevIndex],0.5,{left: "-"+Gallery.containerWidth+'px', opacity: '0'}),
          TweenLite.to(Gallery.images[Gallery.currentIndex], 0.5, {left: '0px', opacity: '1'}),
          TweenLite.to(Gallery.images[nextIndex],0.5,{left: Gallery.containerWidth+'px', opacity:'0'})], 0);
        Gallery.images.map(function(index){
          index === Gallery.currentIndex ? $(Gallery.images[index]).css('z-index',1) : $(Gallery.images[index]).css('z-index',0);
        });
        $('.currentPanel').html(Gallery.currentIndex);
      };

      $timeout(function(){
        Gallery.init();
        Gallery.setCurrentIndex(0);
        Gallery.updateView();
      },1000);
    }
  };
}]);