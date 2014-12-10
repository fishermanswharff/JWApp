'use strict';
angular.module('MainController').controller('PostDetailController',function($scope,$http,trace,$window,PostsFactory,$routeParams,ServerUrl){
  // $scope.postId = $routeParams.postId;
  $http.get(ServerUrl + 'posts/' + $routeParams.postId.toString()).success(function(response){
    $scope.post = response;
    trace($scope.post);
  }).error(function(data, status, headers, config){
    trace(data,status,headers,config,'you are so stupid');
  });
});