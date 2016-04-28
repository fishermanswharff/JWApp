/*global $:false */
'use strict';
angular.module('MainController').controller('ImageUploader',[
  '$rootScope',
  '$scope',
  '$http',
  'AWSFactory',
  'AuthFactory',
  'trace',
  function($rootScope,$scope,$http,AWSFactory,AuthFactory,trace){

  $scope.upsertImage = function(){
    $('.ajax-preloader').addClass('submitted');
    var fileInputs = $('#imageUpload > input[type="file"]');
    for(var i = 0, length = fileInputs.length; i < length; i++){
      var imageFile = fileInputs[i].files[0];
      if (imageFile){
        AWSFactory.sendToAmazon(imageFile).then(function(response){
          $rootScope.$watch('awsResponse',function(newValue,oldValue){
            if(newValue && newValue.status === 204) {
              $('.ajax-preloader').removeClass('submitted');
              $('button[type="submit"]').attr('disabled',false);
            }
          });
          $('form#imageUpload').each(function(){
            this.reset();
          });
        });
      }
    }
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };
}]);
