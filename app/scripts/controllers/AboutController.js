'use strict';

/**
 * @ngdoc function
 * @name jwwebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jwwebApp
 */
angular.module('MainController').controller('AboutController', function($scope,trace) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.stupidThings = [];
    
  });
