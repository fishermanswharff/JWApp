'use strict';
angular.module('MainController').controller('ContactFormController',['$scope','$http','ServerUrl','trace',function($scope,$http,ServerUrl,trace){
  $scope.submitContact = function(message){
    $('#contact-submit-button').addClass('submitted');
    $http.post(ServerUrl + 'email/admin',{name: message.name, email: message.email, body: message.body}).success(function(){
      $scope.message = {};
      $scope.success = 'Your email was sent successfully.';
      $('#contact-submit-button').removeClass('submitted');
    }).error(function(){});
  };
}]);