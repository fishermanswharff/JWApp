'use strict';
angular.module('MainController').controller('ContactFormController',['$scope','$http','ServerUrl','trace',function($scope,$http,ServerUrl,trace){
  $scope.message = '';
  $scope.submitContact = function(message){
    $http.post(ServerUrl + 'email/admin',{name: message.name, email: message.email, body: message.body}).success(function(){
      $scope.success = 'Your email was sent successfully.';
    }).error(function(){
      
    });
  };

  trace();
}]);