'use strict';
angular.module('MainController').controller('NavbarController',['$scope','$http','$window','$location','ServerUrl','AuthFactory','trace',function($scope,$http,$window,$location,ServerUrl,AuthFactory,trace){
  $scope.accounts = [
    {
      'method': 'Email',
      'url': 'mailto:fishermanswharff@mac.com',
      'icon': 'images/icons/email-white.svg'
    },
    {
      'method': 'Github',
      'url': 'https://github.com/fishermanswharff',
      'icon': 'images/icons/github-white.svg'
    },
    {
      'method': 'Twitter',
      'url': 'https://twitter.com/jasonwharff',
      'icon': 'images/icons/twitter-white.svg'
    },
    {
      'method': 'LinkedIn',
      'url': 'https://www.linkedin.com/in/jasonwharff',
      'icon': 'images/icons/linkedin-white.svg'
    },
    {
      'method': 'Instagram',
      'url': 'http://instagram.com/jasonwharff',
      'icon': 'images/icons/instagram-white.svg'
    },
    {
      'method': 'Tumblr',
      'url': 'http://blog.jasonwharff.com',
      'icon': 'images/icons/tumblr-white.svg'
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