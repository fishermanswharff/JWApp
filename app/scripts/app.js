'use strict';

/**
 * @ngdoc overview
 * @name jwwebApp
 * @description
 * # jwwebApp
 *
 * Main module of the application.
 */
angular.module('jwwebApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'MainController',
  'MainDirective',
]).run(function($rootScope,$location,$http, $window,AuthFactory,PostsFactory,CategoryFactory,AWSFactory){
  $rootScope.$on('$routeChangeStart', function(event,next){
    $('nav.navbar').removeClass('active');
    $('a#menu-icon').removeClass('active');
    PostsFactory.fetch();
    CategoryFactory.fetch();
  });
});