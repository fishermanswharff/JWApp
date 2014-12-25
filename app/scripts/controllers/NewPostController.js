/*global $:false */
'use strict';
angular.module('MainController')
.controller('NewPostController',['$rootScope','$scope','$q','$http','$location','AuthFactory','AmazonBucket','AWSFactory','CategoryFactory','ServerUrl','trace',
  function($rootScope,$scope,$q,$http,$location,AuthFactory,AmazonBucket,AWSFactory,CategoryFactory,ServerUrl,trace){

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
        $rootScope.$watch('awsResponse',function(newValue,oldValue){
          if(newValue && newValue.status === 204) {
            $location.path('/posts/'+obj.id);
          }
        });
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