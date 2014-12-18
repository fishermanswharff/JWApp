/*global $:false */
'use strict';
angular.module('jwwebApp').factory('AuthFactory',['$http','$window','ServerUrl','trace',function($http,$window,ServerUrl,trace){
  var login = function(credentials){
    trace(credentials);
    return $http.post(ServerUrl + 'login',credentials).success(function(response){
      storeSession(response);
    });
  };

  var logout = function(){
    return $http.get(ServerUrl + 'logout').success(function(response){
      $window.sessionStorage.removeItem('jw-token');
      trace(response);
    });
  };

  var isAuthenticated = function(){
    return !!$window.sessionStorage.getItem('jw-token');
  };

  var clearStorage = function(){
    trace($window.sessionStorage);
    return !!$window.sessionStorage.clear();
  };

  var postNewUser = function(user){
    return $http.post(ServerUrl + 'users',{user: user}).success(function(response){
      storeSession(response);
    }).error(function(data, status, headers, config){
      trace(data,status,headers,config,'you are so stupid, you are doing it wrong');
    });
  };

  var storeSession = function(response){
    $.each(response,function(key,value){
      $window.sessionStorage.setItem('jw-'+key,value);
    });
    $http.defaults.headers.common.Authorization = 'Token token=' + $window.sessionStorage.getItem('jw-token');
  };

  return {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    clearStorage: clearStorage,
    postNewUser: postNewUser
  };
}]);