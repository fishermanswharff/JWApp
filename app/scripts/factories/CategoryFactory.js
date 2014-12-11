angular.module('jwwebApp').factory('CategoryFactory',funtion($http,ServerUrl,trace){
  var categories = [];
  var fetch = function(){
    $http.get(ServerUrl + 'categories').success(function(response){
      angular.copy(response,posts);
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