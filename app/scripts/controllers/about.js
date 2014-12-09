'use strict';

/**
 * @ngdoc function
 * @name jwwebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jwwebApp
 */
angular.module('jwwebApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
