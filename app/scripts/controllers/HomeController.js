'use strict';
angular.module('MainController').controller('HomeController',function($scope,PostsFactory,trace){
  $scope.posts = PostsFactory.posts;
});