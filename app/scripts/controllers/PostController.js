'use strict';
angular.module('MainController').controller('PostController',function($scope,$q,$http,AuthFactory,AmazonBucket,AWSFactory,CategoryFactory,ServerUrl,trace){

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

  $scope.upsertPost = function(post){
    var params = { post: post }
    $http.post(ServerUrl + 'posts',params).success(function(response){
      $q.all(updateCategories(response.id)).then(function(){
        $location.path('/posts/'+response.id);
      });
    });
  };

  $scope.isLoggedIn = function(){
    return AuthFactory.isAuthenticated();
  };

  var clearForm = function(){

  };
});

/*
//this is the onsubmit script for the image form
$('#imageUpload')
.submit(function(event) {
  event.preventDefault();
  var fileInputs = $('#imageUpload > input[type="file"]')
  for (var i = 0, length = fileInputs.length; i < length; i++) {
    var imageFile = fileInputs[i].files[0];
    getImageData(imageFile);
  }
});
*/