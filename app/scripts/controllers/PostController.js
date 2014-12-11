'use strict';
angular.module('MainController').controller('PostController',function(){


  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };
});