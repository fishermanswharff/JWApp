/*global $:false */
'use strict';
angular.module('MainDirective').directive('postGallery',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    templateUrl: '../views/post-gallery.html',
    link: function($scope,element,attrs){
      
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
        /* debug */ $('.totalPanels').html('totalPanels = '+totalPanels); //.......................
      };

      var resizeImages = function(array,width){
        $(array).each(function(index){
          $(this).css('width',width+'px');
        });
      };

      var clickHandler = function(e){
        $(element).on('click','a',function(e){
          distanceToMove = photoWidth*(-1);
          if($(this).attr('class') === 'slider-nav prev'){
            if(currentPanel == 1){

            }
            // trace('previous nav clicked');
          } else if ($(this).attr('class') === 'slider-nav next'){
            if(currentPanel >= images.length - 1){
              newPhotoPosition = '0px';
              currentPanel = 0;
            } else {
              newPhotoPosition = (currentPanel*distanceToMove)-photoWidth + 'px'; 
              currentPanel++;
            }
            $('.slider-photos').animate({left: newPhotoPosition},500);
          }
          /* debug */ $('.currentPanel').html('currentPanel = '+currentPanel);  //.....................
        });
      };
      $timeout(function(){
        init();
        clickHandler();
      }, 100);
    }
  };
}]);

/*
// Set up Navigation Links
$('.marquee_nav a.marquee_nav_item').click(function(test){
  // Set the navigation state
  $('.marquee_nav a.marquee_nav_item').removeClass('selected');
  $(this).addClass('selected');
  var navClicked = $(this).index();
  var distanceToMove = window.photoWidth*(-1);
  var newPhotoPosition = (navClicked*distanceToMove)-window.photoWidth + 'px';  //NEW subtract window.width
  var newCaption = $('.marquee_panel_caption').get(navClicked);
      
  // Animate photos
  if( window.currentPanel == window.totalPanels && navClicked == 0){
    newPhotoPosition = (window.photoWidth*(window.totalPanels+1)*-1)+'px';
    $('.marquee_photos').animate({left: newPhotoPosition}, 1000, function(){
      $('.marquee_photos').css('left','-'+window.photoWidth+'px');
    });
  }else if( window.currentPanel == 1 && navClicked == (window.totalPanels-1)){
    newPhotoPosition = '0px';
    $('.marquee_photos').animate({left: newPhotoPosition}, 1000, function(){
      $('.marquee_photos').css('left','-'+(window.photoWidth*window.totalPanels)+'px');
    });
  }else{
    $('.marquee_photos').animate({left: newPhotoPosition}, 1000);
  }
  
  window.currentPanel = navClicked + 1;
  $('.currentPanel').html('currentPanel = '+window.currentPanel);  //.....................
  
  // Animate the caption
  $('.marquee_caption').animate({top: '340px'}, 500, function(){
    var newHTML = $(newCaption).html();
    $('.marquee_caption_content').html(newHTML);
    setCaption();
  });
});
