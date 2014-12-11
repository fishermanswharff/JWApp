'use strict';
angular.module('MainController').controller('PostController',function($scope,$http,ServerUrl,AmazonBucket,AuthFactory,trace){
  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };
});