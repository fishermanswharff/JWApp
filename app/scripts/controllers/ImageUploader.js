/*global $:false */
'use strict';
angular.module('MainController').controller('ImageUploader',['$scope','$http','AWSFactory','AuthFactory','trace',function($scope,$http,AWSFactory,AuthFactory,trace){

  $scope.upsertImage = function(){
    var fileInputs = $('#imageUpload > input[type="file"]');
    for(var i = 0, length = fileInputs.length; i < length; i++){
      var imageFile = fileInputs[i].files[0];
      if (imageFile){
        AWSFactory.sendToAmazon(imageFile).then(function(response){
          trace(response);
        });
      }
    }
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };
}]);