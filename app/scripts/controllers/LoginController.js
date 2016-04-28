'use strict';
angular.module('MainController').controller('LoginController',[
  '$scope',
  '$http',
  '$location',
  'AuthFactory',
  'trace',
  function($scope,$http,$location,AuthFactory,trace){
  $scope.createUser = false;
  $scope.message = '';
  $scope.login = function(credentials){
    AuthFactory.login(credentials).success(function(response){
      $location.path('/');
      trace(response);
    });
  };

  $scope.newUser = function(){
    $scope.createUser = true;
  };

  $scope.upsertUser = function(user){
    AuthFactory.postNewUser(user).success(function(response){
      $location.path('/login');
      $scope.message = 'Congratulations, you successfully created an account. Please login to continue.';
      trace(response);
    });
  };
}]);
