'use strict';
angular.module('MainController').controller('HomeController',function($scope,PostsFactory,trace){
  $scope.posts = PostsFactory.posts;
  
  $scope.hasImage = function(post){
    var posts = [];
    posts = $scope.posts.filter(function(item){
      return item.image !== '/images/original/missing.png';
    });
    return posts.length > 0;
  };
});