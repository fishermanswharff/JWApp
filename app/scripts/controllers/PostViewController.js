/*global $:false */
'use strict';
angular.module('MainController')
  .controller('PostViewController',[
    '$rootScope',
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
    function($rootScope,$scope,$sce,$q,$http,$route,$routeParams,$location,AuthFactory,AWSFactory,CategoryFactory,ServerUrl,trace){

  $scope.categories = CategoryFactory.categories;
  $scope.post = {};

  var getPost = function(){
    $http.get(ServerUrl + 'posts/' + $routeParams.postId.toString()).success(function(response){
      $scope.post = response;
      $q.all(assignScope(response), parseCategories()).then(function(){
        $scope.post = response;
        trace($scope.post);
      });
    }).error(function(data, status, headers, config){
      trace(data,status,headers,config,'you are so stupid');
    });
  }

  var assignScope = function(object){
    $scope.post = object;
  };

  var parseCategories = function(){
    _.forEach($scope.categories, function(item) {
      if ($scope.hasCategory(item)) {
        return item.checked = true;
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
    });
    return promises;
  };

  var updateThumbnail = function(postId){
    var promises = [];
    var fileInputs = $('#thumbnailUpload > input[type="file"]');
    for(var i = 0, length = fileInputs.length; i < length; i++){
      var imageFile = fileInputs[i].files[0];
      if(imageFile){
        promises.push(AWSFactory.sendToAmazon(imageFile,postId,false,true));
      }
    }
    return promises;
  };

  var updateFeature = function(postId){
    var promises = [];
    var fileInputs = $('#featuredUpload > input[type="file"]');
    for(var i = 0, length = fileInputs.length; i < length; i++){
      var imageFile = fileInputs[i].files[0];
      if(imageFile){
        promises.push(AWSFactory.sendToAmazon(imageFile,postId,true,false));
      }
    }
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
    $('.ajax-preloader').addClass('submitted');
    $('button[type="submit"]').attr('disabled',true);
    var params = { post: post };
    if(post.id){
      $http.put(ServerUrl + 'posts/' + post.id, params).success(function(response){
        $q.all([updateImages($scope.post.id), updateCategories($scope.post.id), updateThumbnail($scope.post.id), updateFeature($scope.post.id)]).then(function(responses){
          if(responses[0].length > 0){
            $rootScope.$watch('awsResponse',function(newValue,oldValue){
              if(newValue && newValue.status === 204) {
                $('.ajax-preloader').removeClass('submitted');
                $('button[type="submit"]').attr('disabled',false);
                $route.reload();
              }
            });
          } else {
            $('.ajax-preloader').removeClass('submitted');
            $('button[type="submit"]').attr('disabled',false);
          }
        }).finally(function(){
          // $scope.post = response;
          getPost();
          $scope.message = 'Good job motherfucker, you edited your blog post.';
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

  getPost();

}]);