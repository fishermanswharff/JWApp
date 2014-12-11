'use strict';
angular.module('MainController').controller('LoginController',function($scope,$location,AuthFactory,trace){
  $scope.createUser = false;
  
  $scope.login = function(credentials){
    AuthFactory.login(credentials).success(function(response){
      $location.path('/');
      trace(response);
    });
  };
  
  $scope.newUser = function(){
    $scope.createUser = true;
  };
});