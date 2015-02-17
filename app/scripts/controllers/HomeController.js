'use strict';
angular.module('MainController').controller('HomeController',['$scope','$location','$anchorScroll','anchorSmoothScroll','PostsFactory','trace',function($scope,$location,$anchorScroll,anchorSmoothScroll,PostsFactory,trace){
  $scope.posts = PostsFactory.posts;

  $scope.hasImage = function(post){
    return post.thumbnail !== null;
  };

  $scope.scrollDown = function(eID){
    $anchorScroll.yOffset = 50;
    $location.hash(eID);
    anchorSmoothScroll.scrollTo(eID);
  };

  trace($scope.posts);
}]);