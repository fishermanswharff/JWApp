'use strict';

angular.module('jwwebApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/posts/:postId',{
        templateUrl: 'views/post.html',
        controller: 'PostDetailController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/new-post',{
        templateUrl: 'views/newPost.html',
        controller: 'PostController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
