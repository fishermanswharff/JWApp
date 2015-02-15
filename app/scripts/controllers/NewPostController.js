/*global $:false */
'use strict';
angular.module('MainController')
.controller('NewPostController',['$rootScope','$scope','$q','$http','$location','AuthFactory','AmazonBucket','AWSFactory','CategoryFactory','ServerUrl','trace',
  function($rootScope,$scope,$q,$http,$location,AuthFactory,AmazonBucket,AWSFactory,CategoryFactory,ServerUrl,trace){

  $scope.categories = CategoryFactory.categories;

  var updateCategories = function(postId){
    trace('hello from update categories function');
    var promises = [];
    _.forEach($scope.categories,function(item){
      var isChecked = item.checked;
      if(isChecked){
        promises.push($http.put(ServerUrl+'posts/'+postId+'/categories/' + item.id));
      }
    });
    return promises;
  };

  var updateImages = function(postId){
    trace('hello from update images function');
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

  var updateThumbnail = function(postId){
    trace('hello from update thumbnail function');
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

  $scope.upsertPost = function(post){
    $('.ajax-preloader').addClass('submitted');
    $('button[type="submit"]').attr('disabled',true);
    var params = { post: post };
    $http.post(ServerUrl + 'posts',params).success(function(response){
      var obj = response;
      $q.all([updateImages(obj.id), updateCategories(obj.id), updateThumbnail(obj.id), updateFeature(obj.id)]).then(function(responses){
        if(responses[0].length === 0 || responses[2].length === 0 || responses[3].length === 0){
          $('.ajax-preloader').removeClass('submitted');
          $location.path('/posts/'+obj.id);
        } else {
          $rootScope.$watch('awsResponse',function(newValue,oldValue){
            if(newValue && newValue.status === 204) {
              $('.ajax-preloader').removeClass('submitted');
              $location.path('/posts/'+obj.id);
            }
          });
        }
      });
    });
  };

  $scope.upsertCategory = function(category){
    var params = {category: category};
    $http.post(ServerUrl + 'categories', params).success(function(response){
      $scope.categories.push(response);
      $('form[name="categoryForm"]').each(function(){
        this.reset();
      });
    }).error();
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };

  trace();

}]);