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
        $('.slider-photos').fadeIn(1500);
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
          $(images[i]).css('width',width+'px').css('left',photoPosition+'px');
          $('.slider-photos').css('width',photoPosition+width+'px');
        }
      };

      Gallery.setCurrentIndex = function(index){
        Gallery.currentIndex = index;
        if(Gallery.currentIndex > Gallery.images.length) Gallery.currentIndex = 0;
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
        trace(Gallery.currentIndex);
      };

      Gallery.updateView = function(){
        // TweenLite.to(Gallery.imgContainer,.5,{left: Gallery.currentIndex * Gallery.containerWidth});
        // Gallery.images[Gallery.currentIndex])
      };
      

      $timeout(function(){
        Gallery.init();
      },100);
      
      /*
      var currentPanel,totalPanels,navClicked,distanceToMove,newPhotoPosition,newCaption,photoWidth,images;
      var init = function(){
        totalPanels = $('.slider-photos img').length;
        photoWidth = element.find('div.slider-container').width();
        $('.slider-photos img:last-child').clone().insertBefore('.slider-photos img:first-child');
        $('.slider-photos img:nth-child(2)').clone().insertAfter('.slider-photos img:last-child');
        images = $('.slider-photos img');
        resizeImages(images,photoWidth);
        $(images).each(function(index){
          var photoPosition = index * photoWidth;
          $(this).css('left', photoPosition+'px');
          $('.slider-photos').css('width',photoPosition+photoWidth+'px');
        });
        $('.slider-photos').css('left','-'+photoWidth+'px');
        currentPanel = $(images).index(images[1]);
        $('.slider-photos').fadeIn(1500);
        $('.totalPanels').html('totalPanels = '+totalPanels);
      };
      var resizeImages = function(array,width){
        $(array).each(function(index){
          $(this).css('width',width+'px');
        });
      };
      var clickHandler = function(e){
        var slider = $('.slider-photos');
        $(element).on('click','a',function(e){
          
          distanceToMove = photoWidth*(-1);
          var newPhotoPosition; // = (currentPanel*distanceToMove)-photoWidth + 'px';
          
          if($(this).attr('class') === 'slider-nav prev'){
            if(currentPanel === 1){
              newPhotoPosition = '0px';
              currentPanel = 0;
            } else if(currentPanel === 0){
              newPhotoPosition = (currentPanel*distanceToMove)+photoWidth + 'px';
            } else {
              newPhotoPosition = (currentPanel*distanceToMove)+photoWidth + 'px';
            }
            trace('previous nav clicked');
          } else if ($(this).attr('class') === 'slider-nav next'){
            if(currentPanel == totalPanels + 1){
              newPhotoPosition = '0px';
              currentPanel = 0;
            } else {
              newPhotoPosition = (currentPanel*distanceToMove)-photoWidth + 'px'; 
              currentPanel++;
            }
            trace('next nav clicked');
          }
          TweenLite.to(slider,.5,{left: newPhotoPosition});
          $('.currentPanel').html('currentPanel = '+currentPanel);
        });
      };
      $timeout(function(){
        init();
        clickHandler();
      }, 100);
      */
    }
  };
}]);