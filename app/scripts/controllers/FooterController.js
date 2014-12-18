'use strict';
angular.module('MainController').controller('FooterController',['$scope',function($scope){
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
}]);