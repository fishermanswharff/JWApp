'use strict';

/**
 * @ngdoc function
 * @name jwwebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jwwebApp
 */
angular.module('MainController').controller('AboutController','trace', function($scope,trace) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    trace($scope.awesomeThings);
  });
