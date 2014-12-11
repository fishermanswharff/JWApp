'use strict';
angular.module('MainController').controller('PostDetailController',function($scope,$http,trace,$window,PostsFactory,$routeParams,ServerUrl){
  // $scope.postId = $routeParams.postId;
  $http.get(ServerUrl + 'posts/' + $routeParams.postId.toString()).success(function(response){
    $scope.post = response;
    // trace($scope.post);
  }).error(function(data, status, headers, config){
    trace(data,status,headers,config,'you are so stupid');
  });

  $scope.upsertPost = function(post){
    var params = { post: post }
    if(post.id){
      $http.put(ServerUrl + 'posts/' + post.id, params).success(function(response){
        trace(response);
        $scope.message = response.status;
      });
    }
  };
});