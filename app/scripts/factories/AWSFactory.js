'use strict';
angular.module('jwwebApp').factory('AWSFactory',['$http','$q','$location','ServerUrl','AmazonBucket','trace',function($http,$q,$location,ServerUrl,AmazonBucket,trace){

  var signKeyResults, postID;

  var fetchKey = function(){
    return $q(function(resolve,reject){
      $http.get(ServerUrl + 'amazon/sign_key').success(function(response){
        resolve(response);
      }).error(function(data,status,headers,config){
        trace(data, status, headers, config, 'failed to get a signkey from api');
      });
    });
  };

  var sendToAmazon = function(imageFile, postId){
    postID = postId;
    return fetchKey().then(function(response){
      signKeyResults = response;
      if(postID){
        postRails(makePayload(postID),postId).then(function(response){
          return $http.post(AmazonBucket, buildFormData(imageFile), {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Authorization':'' }
          }).then(function(response){
            return response;
          });
        });
      } else {
        return $http.post(AmazonBucket, buildFormData(imageFile), {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined, 'Authorization':'' }
        }).then(function(response){
          return response;
        });
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
    return $q(function(resolve,reject){
      $http.post(ServerUrl+'posts/'+postId+'/images', params).success(function(response){
        resolve(response);
      }).error(function(data, status, headers, config){
        reject(data);
      });
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