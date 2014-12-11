'use strict';
angular.module('MainController').controller('PostController',function($scope,$http,AuthFactory,AmazonBucket,AWSFactory,CategoryFactory,ServerUrl,trace){

  $scope.categories = CategoryFactory.categories;

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };
});

/*

this is the onsubmit script for the image form

$('#imageUpload')
.submit(function(event) {
  event.preventDefault();
  var fileInputs = $('#imageUpload > input[type="file"]')
  for (var i = 0, length = fileInputs.length; i < length; i++) {
    var imageFile = fileInputs[i].files[0];
    getImageData(imageFile);
  }
});





*/