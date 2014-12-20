/*global $:false */
'use strict';
angular.module('MainController').controller('ContactFormController',['$scope','$http','ServerUrl','trace',function($scope,$http,ServerUrl,trace){
  $scope.submitContact = function(message){
    $('.preloader').addClass('submitted');
    $('#contact-submit-button').attr('disabled',true);
    $http.post(ServerUrl + 'email/admin',{name: message.name, email: message.email, body: message.body}).success(function(){
      $scope.message = {};
      $scope.success = 'Your email was sent successfully.';
      $('#contact-submit-button').attr('disabled',false);
      $('.preloader').removeClass('submitted');
    }).error(function(){});
  };
}]);