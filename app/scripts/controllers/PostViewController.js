/*global $:false */
'use strict';
angular.module('MainController')
  .controller('PostViewController',[
    '$scope',
    '$sce',
    '$q',
    '$http',
    '$route',
    '$routeParams',
    '$location',
    'AuthFactory',
    'AWSFactory',
    'CategoryFactory',
    'ServerUrl',
    'trace',
    function($scope,$sce,$q,$http,$route,$routeParams,$location,AuthFactory,AWSFactory,CategoryFactory,ServerUrl,trace){

  $scope.categories = CategoryFactory.categories;
  $scope.post = {};

  $http.get(ServerUrl + 'posts/' + $routeParams.postId.toString()).success(function(response){
    $q.all(assignScope(response), parseCategories()).then(function(){
      $scope.post = response;
      trace('done getting post');
    });
  }).error(function(data, status, headers, config){
    trace(data,status,headers,config,'you are so stupid');
  });

  var assignScope = function(object){
    $scope.post = object;
  };

  var parseCategories = function(){
    _.forEach($scope.categories, function(item) {
      if ($scope.hasCategory(item)) {
        item.checked = true;
      }
    });
  };

  var updateCategories = function(postId){
    var promises = [];
    _.forEach($scope.categories,function(item){
      var isChecked = item.checked;
      var wasChecked = typeof _.find($scope.post.categories,{id: item.id}) !== 'undefined';
      if(isChecked && !wasChecked){
        promises.push($http.put(ServerUrl+'posts/'+postId+'/categories/' + item.id));
      }
      if(!isChecked && wasChecked){
        promises.push($http.delete(ServerUrl+'posts/'+postId+'/categories/'+item.id));
      }
      if(isChecked && wasChecked){}
    });
    return promises;
  };

  var updateImages = function(postId){
    var promises = [];
    var fileInputs = $('#imageUpload > input[type="file"]');
    for (var i = 0, length = fileInputs.length; i < length; i++) {
      var imageFile = fileInputs[i].files[0];
      if(imageFile) {
        promises.push(AWSFactory.sendToAmazon(imageFile,postId));
      }
    }
    return promises;
  };

  $scope.upsertPost = function(post){
    $('.preloader').addClass('submitted');
    $('button[type="submit"]').attr('disabled',true);
    var params = { post: post };
    if(post.id){
      $http.put(ServerUrl + 'posts/' + post.id, params).success(function(response){
        $q.all(updateImages(response.id),updateCategories(response.id)).then(function(response){
          // $scope.post = response;
          $('.preloader').removeClass('submitted');
          $('button[type="submit"]').attr('disabled',false);
          $scope.message = 'Good job motherfucker, you edited your blog post.';
          $route.reload();
        });
      });
    }
  };

  $scope.hasCategory = function(category){
    var found = [];
    if(typeof $scope.post !== 'undefined' && typeof $scope.post.categories !== 'undefined') {
      found = $scope.post.categories.filter(function(item){
        return item.id === category.id;
      });
    }
    return found.length > 0;
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };

  $scope.deletePost = function(post){
    $http.delete(ServerUrl+'posts/'+post.id).success(function(){
      $location.path('/');
    });
  };

  
}]);