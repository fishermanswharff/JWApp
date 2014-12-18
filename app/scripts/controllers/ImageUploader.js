/*global $:false */
'use strict';
angular.module('MainController').controller('ImageUploader',['$scope','$http','AWSFactory','AuthFactory',function($scope,$http,AWSFactory,AuthFactory){

  $scope.upsertImage = function(){
    var fileInputs = $('#imageUpload > input[type="file"]');
    for(var i = 0, length = fileInputs.length; i < length; i++){
      var imageFile = fileInputs[i].files[0];
      AWSFactory.sendToAmazon(imageFile);
    }
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };
}]);