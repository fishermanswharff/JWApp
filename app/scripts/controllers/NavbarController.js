'use strict';
angular.module('MainController').controller('NavbarController',function($scope,trace){
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

  trace($scope.accounts);
});

/*
'contact':{
    'Email': {
      'url': 'mailto:fishermanswharff@mac.com',
      'icon': 'images/email-white.svg'
    },
    'Github': {
      'url': 'https://github.com/fishermanswharff',
      'icon': 'images/github-white.svg'
    },
    'Twitter': {
      'url': 'https://twitter.com/jasonwharff',
      'icon': 'images/twitter-white.svg'
    },
    'LinkedIn': {
      'url': 'https://www.linkedin.com/in/jasonwharff',
      'icon': 'images/linkedin-white.svg'
    },
    'Instagram': {
      'url': 'http://instagram.com/jasonwharff',
      'icon': 'images/instagram-white.svg'
    },
    'Tumblr': {
      'url': 'http://blog.jasonwharff.com',
      'icon': 'images/tumblr-white.svg'
    }

*/