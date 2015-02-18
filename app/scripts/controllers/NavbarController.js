'use strict';
angular.module('MainController').controller('NavbarController',['$scope','$http','$window','$location','ServerUrl','AuthFactory','trace','$filter','postsFilterFilter','PostsFactory',function($scope,$http,$window,$location,ServerUrl,AuthFactory,trace,$filter,postsFilter,PostsFactory){
  $scope.accounts = [
    {
      'method': 'Email',
      'url': 'mailto:fishermanswharff@mac.com'
    },
    {
      'method': 'Github',
      'url': 'https://github.com/fishermanswharff'
    },
    {
      'method': 'Twitter',
      'url': 'https://twitter.com/jasonwharff'
    },
    {
      'method': 'LinkedIn',
      'url': 'https://www.linkedin.com/in/jasonwharff'
    },
    {
      'method': 'Instagram',
      'url': 'http://instagram.com/jasonwharff'
    },
    {
      'method': 'Tumblr',
      'url': 'http://blog.jasonwharff.com'
    }
  ];

  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.logout = function(){
    AuthFactory.logout().success(function(){
      $location.path('/login');
      AuthFactory.clearStorage();
    });
  };

  $scope.user = function(){
    return AuthFactory.getUserData();
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };
  trace();
}]);