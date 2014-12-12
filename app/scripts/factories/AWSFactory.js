'use strict';
angular.module('jwwebApp').factory('AWSFactory',function($http,$q,ServerUrl,AmazonBucket,trace){
  // .constant('AmazonBucket','http://dubya-blog-bucket.s3.amazonaws.com/');  
  var signKeyResults, imageData, imagePayload;

  var prepareImage = function(imageFile, postId){
    return $http.get(ServerUrl + 'amazon/sign_key').success(function(response){
      $q.all(buildKey(response)).then(function(){
        $http.post(ServerUrl+'posts/'+postId+'/images', imagePayload).success(function(response){
          debugger;
          // imageData.append("Policy",signKeyResults.policy);
        }).error(function(){});
      });
    });
  };

  var buildKey = function(response){
    signKeyResults = response;
    imageData = new FormData();
    imagePayload = { image: 
      {
        url: AmazonBucket+signKeyResults.key
        postId: postId,
      }
    };
  };

  return {
    prepareImage: prepareImage
  };
});