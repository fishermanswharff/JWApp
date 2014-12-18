/*global $:false */
'use strict';
angular.module('MainDirective').directive('postGallery',['trace','$timeout',function(trace,$timeout){
  return {
    restrict: 'EA',
    templateUrl: '../views/post-gallery.html',
    link: function($scope,element,attrs){
      
      var currentPanel, navClicked, distanceToMove, newPhotoPosition, newCaption, photoWidth, images;
      
      var init = function(){
        // build the image gallery;
        // get the photowidth
        photoWidth = element.find('div.slider-container').width();
        images = $('.slider-photos img');

        // loop through the images, dynamically set css based on photo width 
        $(images).each(function(index){
          var photoPosition = index * photoWidth;
          $(this).css('left', photoPosition+'px');
          $('.slider-photos').css('width',photoPosition+photoWidth+'px');
        });

        $('.slider-photos img:last-child').clone().insertBefore('.slider-photos img:first-child');
        $('.slider-photos img:nth-child(2)').clone().insertAfter('.slider-photos img:last-child');
        $('.slider-photos').css('left','-'+photoWidth+'px');
        
        currentPanel = $(images).index(images[1]);
        $('.slider-photos').fadeIn(1500);

      };
      
      $(element).on('click','a',function(e){
        distanceToMove = photoWidth*(-1);
        
        if($(this).attr('class') === 'slider-nav prev'){
          if(currentPanel == 1){

          }
          trace('previous nav clicked');
        } else if ($(this).attr('class') === 'slider-nav next'){
          if(currentPanel >= images.length){
            newPhotoPosition = '0px';
            currentPanel = 0;
          } else {
            newPhotoPosition = ((currentPanel+1)*distanceToMove)-photoWidth + 'px'; 
            currentPanel++;  
          }
          $('.slider-photos').animate({left: newPhotoPosition},1000);
          trace(currentPanel);
        }
      });

      $timeout(function(){
        init();
      }, 100);

    }
  };
}]);

/*
var ready;
ready = function(){

  function trace() {for(var i = 0, count = arguments.length; i < count; i++){console.log(arguments[i]);}};

  window.photoWidth = $('.slider-container').width();
  var currentPanel, navClicked, distanceToMove, newPhotoPosition, newCaption;

  // autoplay
  $('.slider-container').hover(
    function(){
      window.autoPlay = false;
      $(this).removeClass('autoplay');
    },
    function(){
      window.autoPlay = true;
      window.timePassed = 0;
      $(this).addClass('autoplay')
    }
  );

  $('.slide').each(function(index){
    $('.slider-nav').append('<a class="slider-nav-item" >'+(index+1)+'</a>');
  });

  $('img.featured-image').each(function(index){
    $('.slider-photos').append('<img class="slider-photo" src="'+$(this).attr('src')+'" alt="'+$(this).attr('alt')+'" />');
  });

  $('.slider-photos img:last-child').clone().insertBefore('.slider-photos img:first-child');
  $('.slider-photos img:nth-child(2)').clone().insertAfter('.slider-photos img:last-child');

  $('.slider-photos img').each(function(index){
    var photoPosition = index * window.photoWidth;
    $(this).css('left', photoPosition+'px');
    $('.slider-photos').css('width',photoPosition+window.photoWidth+'px');
  });

  $('.slider-photos').css('left','-'+window.photoWidth+'px');

  $('.slider-nav a.slider-nav-item').click(function(test){
    $('.slider-nav a.slider-nav-item').removeClass('selected');
    $(this).addClass('selected');
    $('.slider-captions').animate({opacity: 0}, 100);
    navClicked = $(this).index();
    distanceToMove = window.photoWidth*(-1);
    newPhotoPosition = (navClicked*distanceToMove)-window.photoWidth + 'px';
    newCaption = $('.slide-caption').get(navClicked);
    
    if(window.currentPanel == window.totalPanels && navClicked == 0){
      newPhotoPosition = (window.photoWidth*(window.totalPanels+1)* -1)+'px';
      $('.slider-photos').animate({left: newPhotoPosition},1000,function(){
        $('.slider-photos').css('left','-'+window.photoWidth+'px');
      });
    } else if (window.currentPanel == 1 && navClicked == (window.totalPanels-1)) {
      newPhotoPosition = '0px';
      $('.slider-photos').animate({left: newPhotoPosition}, 1000, function(){
        $('.slider-photos').css('left','-'+(window.photoWidth*window.totalPanels)+'px');
      });
    } else {
      $('.slider-photos').animate({left: newPhotoPosition},1000);
    }
    window.currentPanel = navClicked + 1;
    $('.currentPanel').html('currentPanel = '+window.currentPanel);

    $('.slider-captions').animate({opacity: 1},500,function(){
      var newHTML = $(newCaption).html();
      $('.caption-content').html(newHTML);
      setCaption();
    });

  });

  $('.slider-step').on("click", "a", function(){
    if ($(this).attr("class") == 'slider-nav-prev' ) {
      
    } else if ($(this).attr("class") == 'slider-nav-next' ) {

    }
  });

  $('.slides img').imgpreload(function(){
    initializeSlider();
  });

  function initializeSlider(){
    $('.caption-content').html(
      $('.slides .slide:first .slide-caption').html()
    );
    $('.slider-nav a.slider-nav-item:first').addClass('selected');
    $('.slider-photos').fadeIn(1500);
    setCaption();
  }

  function setCaption(){
    var captionHeight = $('.slider-captions').height();
    var sliderHeight = $('.slider-container').height();
    var newCaptionTop = sliderHeight - captionHeight - 200;

    $('.slider-captions').delay(100).animate({
      // top: newCaptionTop,
      opacity: 1
    }, 500);
  }

  $(window).resize(function(){
  });

};

$(document).ready(ready);
$(document).on('page:load', ready);



*/













