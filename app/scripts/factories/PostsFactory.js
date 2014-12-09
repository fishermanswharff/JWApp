'use strict';
angular.module('jwwebApp').factory('PostsFactory',function($http,ServerUrl,trace){
  var posts = [];

  var fetch = function(){
    $http.get(ServerUrl + 'posts').success(function(response){
      angular.copy(response,posts);
    }).error(function(data, status, headers, config) {
      trace(data,status,headers,config);
    });
  };
  return {
    fetch: fetch,
    posts: posts
  };
});