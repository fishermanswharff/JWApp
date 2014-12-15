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
        controller: 'PostViewController'
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
        controller: 'NewPostController'
      })
      .when('/image-uploader',{
        templateUrl: 'views/image-uploader.html',
        controller: 'ImageUploader'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
