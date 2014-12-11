'use strict';
angular.module('MainController').controller('LoginCtrl',function($scope,$location,AuthFactory){
  $scope.createUser = false;
  
  $scope.login = function(credentials){
    AuthFactory.login(credentials).success(function(response){
      $location.path('/');
    });
  };
  
  $scope.newUser = function(){
    $scope.createUser = true;
  };
});