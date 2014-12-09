'use strict';

/**
 * @ngdoc function
 * @name jwwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jwwebApp
 */
angular.module('jwwebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
