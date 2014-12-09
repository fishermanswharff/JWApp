'use strict';
angular.module('jwwebApp').factory('AuthFactory',function($http,$window,ServerUrl,trace){
  var login = function(credentials){
    trace(credentials);
    return $http.post(ServerUrl + 'login',credentials).success(function(response){
      $window.sessionStorage.setItem('jwwebApp.user',response.token);
      $http.defaults.headers.common['Authorization'] = 'Token token=' + $window.sessionStorage.getItem('jwwebApp.user');
    });
  };

  var logout = function(credentials){
    return $http.get(ServerUrl + 'logout').success(function(response){
      $window.sessionStorage.removeItem('jwwebApp.user');
    });
  };

  var isAuthenticated = function(){
    return !!$window.sessionStorage.getItem('jwwebApp.user');
  };

  return {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated
  };
});