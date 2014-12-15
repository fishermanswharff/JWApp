'use strict';
angular.module('MainController',['$scope','$location','$anchorScroll','anchorSmoothScroll','PostsFactory','trace',function($scope,PostsFactory,trace,$location,$anchorScroll, anchorSmoothScroll){
  $scope.posts = PostsFactory.posts;
  
  $scope.hasImage = function(post){
    return post.images.length > 0;
  };

  $scope.scrollDown = function(eID){
    $anchorScroll.yOffset = 50;
    $location.hash(eID);
    anchorSmoothScroll.scrollTo(eID);
  };
}]);