'use strict';
angular.module('MainController').controller('HomeController',function($scope,PostsFactory,trace,$location,$anchorScroll, anchorSmoothScroll){
  $scope.posts = PostsFactory.posts;
  
  $scope.hasImage = function(post){
    return post.images.length > 0;
    /*var posts = [];
    posts = $scope.posts.filter(function(item){
      debugger;
      return item.images.length > 0;
    });
    trace(posts.length > 0);
    return posts.length > 0;*/
  };

  $scope.scrollDown = function(eID){
    $anchorScroll.yOffset = 50;
    $location.hash(eID);
    anchorSmoothScroll.scrollTo(eID);
  };
});