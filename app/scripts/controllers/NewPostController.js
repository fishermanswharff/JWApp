'use strict';
angular.module('MainController').controller('NewPostController',function($scope,$q,$http,$location,AuthFactory,AmazonBucket,AWSFactory,CategoryFactory,ServerUrl,trace){

  $scope.categories = CategoryFactory.categories;

  var updateCategories = function(postId){
    var promises = [];
    _.forEach($scope.categories,function(item){
      var isChecked = item.checked;
      if(isChecked){
        promises.push($http.put(ServerUrl+'posts/'+postId+'/categories/' + item.id))
      }
    });
  };

  var updateImages = function(postId){
    var promises = [];
    var fileInputs = $('#imageUpload > input[type="file"]');
    for (var i = 0, length = fileInputs.length; i < length; i++) {
      var imageFile = fileInputs[i].files[0];
      if(imageFile) promises.push(AWSFactory.prepareKey(imageFile,postId));
    }
  };

  $scope.upsertPost = function(post){
    var params = { post: post }
    $http.post(ServerUrl + 'posts',params).success(function(response){
      $q.all(updateImages(response.id), updateCategories(response.id)).then(function(){
        $location.path('/posts/'+response.id);
      });
    });
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };

  var clearForm = function(){};
  
});