/*global $:false */
'use strict';
angular.module('MainController').controller('CategoriesController',['$scope','$http','trace','CategoryFactory','ServerUrl',function($scope,$http,trace,CategoryFactory,ServerUrl){

  $scope.categories = CategoryFactory.categories;

  $scope.upsertCategory = function(category){
    var params = {category: category};
    $http.post(ServerUrl + 'categories', params).success(function(response){
      $scope.categories.push(response);
      $('form[name="categoryForm"]').each(function(){
        this.reset();
      });
    }).error();
  };
}]);