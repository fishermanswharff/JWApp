'use strict';
angular.module('MainController').controller('PostDetailController',function($scope,$http,trace,$window,$routeParams,ServerUrl,AuthFactory){
  
  $http.get(ServerUrl + 'posts/' + $routeParams.postId.toString()).success(function(response){
    $scope.post = response;
  }).error(function(data, status, headers, config){
    trace(data,status,headers,config,'you are so stupid');
  });

  $scope.upsertPost = function(post){
    var params = { post: post };
    if(post.id){
      $http.put(ServerUrl + 'posts/' + post.id, params).success(function(response){
        $scope.message = 'Good job motherfucker, you edited your blog post.';
      });
    }
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };

});