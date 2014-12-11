'use strict';
angular.module('jwwebApp').factory('AuthFactory',function($http,$window,ServerUrl,trace){
  var login = function(credentials){
    trace(credentials);
    return $http.post(ServerUrl + 'login',credentials).success(function(response){
      $.each(response,function(key,value){
        $window.sessionStorage.setItem('jw-'+key,value);
      });
      $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('jw-token');
    });
  };

  var logout = function(){
    return $http.get(ServerUrl + 'logout').success(function(response){
      $window.sessionStorage.removeItem('jw-token');
    });
  };

  var isAuthenticated = function(){
    return !!$window.sessionStorage.getItem('jw-token');
  };

  var clearStorage = function(){
    trace($window.sessionStorage);
    return !!$window.sessionStorage.clear();
  };

  return {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    clearStorage: clearStorage
  };
});