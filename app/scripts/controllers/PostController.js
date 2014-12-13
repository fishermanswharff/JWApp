'use strict';
angular.module('MainController').controller('PostController',function($scope,$q,$http,$location,AuthFactory,AmazonBucket,AWSFactory,CategoryFactory,ServerUrl,trace){

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
      promises.push(AWSFactory.prepareKey(imageFile,postId));
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

  var clearForm = function(){

  };
});




/*
//onsubmit form listener, prevents default()
$(document).ready(function() {
  $('#imageUpload')
  .submit(function(event) {
    event.preventDefault();
    var fileInputs = $('#imageUpload > input[type="file"]')
    for (var i = 0, length = fileInputs.length; i < length; i++) {
      var imageFile = fileInputs[i].files[0];
      getImageData(imageFile);
    }
  });
});


//
var getImageData = function(imageFile,image_set_id) {
  var image_set_id = image_set_id
  $.ajax({
    url: 'https://polar-chamber-4218.herokuapp.com/amazon/sign_key',
    type: 'GET',
    data: {
      file_name: 'url.jpg'
    },
  })
  .done(function(results){
    var signKeyResults = results;
    var imageData = new FormData();
    var imagePayload = {
            image: {
              image_set_id: image_set_id,
              url: 'http://pixelectapp.s3.amazonaws.com/'+signKeyResults.key
            }
          }
    $.ajax({
      url:"https://polar-chamber-4218.herokuapp.com/image_sets/"+image_set_id+'/images',
      type: 'POST',
      data: imagePayload
    })
    .done(function(results){
      imageData.append("Policy", signKeyResults.policy);
      imageData.append("Signature", signKeyResults.signature);
      imageData.append("acl", signKeyResults.acl);
      imageData.append("success_action_status", signKeyResults.sas);
      imageData.append("AWSAccessKeyId", signKeyResults.access_key);
      imageData.append("key", signKeyResults.key);
      imageData.append("file", imageFile);

      postImageData(imageData, signKeyResults.key);
    });

  });
};

var postImageData = function(formData, key) {
  // post the form data
  $.ajax({
    url: 'http://pixelectapp.s3.amazonaws.com/',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false
  })
  .done(function(result){
    var imageUrl = 'http://pixelectapp.s3.amazonaws.com/'+key;
    var imageElement = $('<img>').attr('src', imageUrl);
    $('#images').append(imageElement);
  });
};






*/


