'use strict';
angular.module('jwwebApp').factory('CategoryFactory',function($http,ServerUrl,trace){
  var categories = [];
  var fetch = function(){
    $http.get(ServerUrl + 'categories').success(function(response){
      angular.copy(response,categories);
      trace(response);
    }).error(function(data, status, headers, config) {
      trace(data,status,headers,config);
    });
  };

  return {
    categories: categories,
    fetch: fetch
  };
});