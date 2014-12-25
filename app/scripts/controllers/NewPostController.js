/*global $:false */
/*global _:false */
'use strict';
angular.module('MainController')
.controller('NewPostController',['$scope','$q','$http','$location','AuthFactory','AmazonBucket','AWSFactory','CategoryFactory','ServerUrl','trace',
  function($scope,$q,$http,$location,AuthFactory,AmazonBucket,AWSFactory,CategoryFactory,ServerUrl,trace){

  $scope.categories = CategoryFactory.categories;

  var updateCategories = function(postId){
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
    $http.post(ServerUrl + 'posts',params).success(function(response){
      var obj = response;
      $q.all([updateImages(obj.id), updateCategories(obj.id)])
      .then(function(responses){
        // $('.preloader').removeClass('submitted');
        // $('button[type="submit"]').attr('disabled',false);
        trace(responses[0],responses[1], 'successCallback');
        // $location.path('/posts/'+obj.id);
      }, function(responses){
        trace(responses[0],responses[1], 'error callback!!');
      }, function(responses){
        trace(responses[0],responses[1], 'notifyCallback');
      }).finally(function(callback){
        trace(callback, 'finally callback');
      }, function(notifyCallback){
        trace(notifyCallback, 'finally notify callback');
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
  /*
  var clearForm = function(){
    
  };
  */
  
}]);