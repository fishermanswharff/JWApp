'use strict';
/*global $:false */
/**
 * @ngdoc overview
 * @name jwwebApp
 * @description
 * # jwwebApp
 *
 * Main module of the application.
 */
angular.module('jwwebApp',[
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
]).run(function($rootScope,$location,$http,$window,AuthFactory,PostsFactory,CategoryFactory){
  $rootScope.$on('$routeChangeStart', function(event,next){
    // console.log(event,next);
    if(AuthFactory.isAuthenticated()) {
      $http.defaults.headers.common.Authorization = 'Token token=' + $window.sessionStorage.getItem('jw-token');
    }
    $('nav.navbar').removeClass('active');
    $('a#menu-icon').removeClass('active');
    PostsFactory.fetch();
    CategoryFactory.fetch();
  });
});