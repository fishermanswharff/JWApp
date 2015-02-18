'use strict';
angular.module('MainController').controller('HomeController',['$scope','$location','$anchorScroll','anchorSmoothScroll','PostsFactory','CategoryFactory','trace',function($scope,$location,$anchorScroll,anchorSmoothScroll,PostsFactory,CategoryFactory,trace){
  $scope.posts = PostsFactory.posts;
  $scope.categories = CategoryFactory.categories;
  $scope.hasImage = function(post){
    return post.thumbnail !== null;
  };

  $scope.touchInput = function(){
    trace($('select[name="categories"]'));
    setTimeout(function(){
      $('select[name="categories"]').fadeOut();
    },2000);
  };


  $scope.scrollDown = function(eID){
    $anchorScroll.yOffset = 50;
    $location.hash(eID);
    anchorSmoothScroll.scrollTo(eID);
  };

  trace($scope.posts);
}]);