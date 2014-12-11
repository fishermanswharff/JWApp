'use strict';
angular.module('MainController').controller('PostDetailController',function($scope,$http,trace,$window,$routeParams,ServerUrl,PostsFactory,AuthFactory,FileUploader){
  $scope.uploader = new FileUploader({
    url: ServerUrl + 'posts/' + $routeParams.postId.toString()
  });
  $http.get(ServerUrl + 'posts/' + $routeParams.postId.toString()).success(function(response){
    $scope.post = response;
  }).error(function(data, status, headers, config){
    trace(data,status,headers,config,'you are so stupid');
  });

  $scope.upsertPost = function(post){
    var params = { post: post }
    if(post.id){
      $http.put(ServerUrl + 'posts/' + post.id, params).success(function(response){
        $scope.message = response.status;
      });
    }
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };

  $scope.uploader.onProgressItem = function(fileItem, progress) {
    console.info('onProgressItem', fileItem, progress);
  };
});