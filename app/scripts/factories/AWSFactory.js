'use strict';
angular.module('jwwebApp').factory('AWSFactory',function($http,ServerUrl,AmazonBucket,trace){
  
  var signKeyResults, imageData, imagePayload;
  var getImageData = function(){
    return $http.get(ServerUrl + 'amazon/sign_key').success(function(response){
      signKeyResults = response;
      imageData = new FormData();
      imagePayload = { 
        image: 
          {
            postId: postId,
            url: AmazonBucket+signKeyResults.key
          }
        };
    });
  };
  return {
    getImageData: getImageData
  };
});