'use strict';
angular.module('MainController').controller('HomeController',[
  '$scope',
  '$location',
  'PostsFactory',
  'CategoryFactory',
  'trace',
  function($scope,$location,PostsFactory,CategoryFactory,trace){
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
    trace($scope.posts);
}]);
