'use strict';
angular.module('jwwebApp').factory('AWSFactory',['$http','$q','$location','ServerUrl','AmazonBucket','trace',function($http,$q,$location,ServerUrl,AmazonBucket,trace){

  var signKeyResults, postID;

  var sendToAmazon = function(imageFile, postId){
    postID = postId;
    return $http.get(ServerUrl + 'amazon/sign_key').success(function(response){
      signKeyResults = response;
      if(postID){
        $q.all(postRails(makePayload(postId), postId)).then(function(){
          postImageData(imageFile);
        });
      } else {
        postImageData(imageFile);
      }
    });
  };

  var makePayload = function(postId){
    var imagePayload = {
      image: {
        post_id: postId,
        url: AmazonBucket+signKeyResults.key,
      }
    };
    return imagePayload;
  };

  var postRails = function(params,postId){
    var promises = [];
    promises.push($http.post(ServerUrl+'posts/'+postId+'/images', params));
  };

  var postImageData = function(imageFile){
    $http.post(AmazonBucket, buildFormData(imageFile), {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization':'',
      }
    }).success(function(response){
      $q.all(function(){
        if(postID) {
          $location.path('/posts/'+postID);
          trace(response);
        }
      });
    }).error(function(data, status, headers, config){
      trace(data, status, headers, config, 'failed posting to AWS');
    });
  };

  var buildFormData = function(imageFile){
    var formdata = new FormData();
    formdata.append('key',signKeyResults.key);
    formdata.append('AWSAccessKeyId',signKeyResults.access_key);
    formdata.append('policy',signKeyResults.policy);
    formdata.append('acl','public-read');
    formdata.append('signature',signKeyResults.signature);
    formdata.append('Content-Type','image/jpeg');
    formdata.append('file',imageFile);
    return formdata;
  };

  return {
    sendToAmazon: sendToAmazon
  };
}]);