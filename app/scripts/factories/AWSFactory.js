'use strict';
angular.module('jwwebApp').factory('AWSFactory',['$rootScope','$http','$q','$location','ServerUrl','AmazonBucket','trace',function($rootScope,$http,$q,$location,ServerUrl,AmazonBucket,trace){

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

  var sendToAmazon = function(imageFile, postId, featured, thumb){
    postID = postId;
    return fetchKey().then(function(response){
      signKeyResults = response;
      if(postID && !featured && !thumb){
        postRails(makeImagePayload(postID),postId,'/images').then(function(response){
          $http.post(AmazonBucket, buildFormData(imageFile), {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Authorization':'' }
          }).then(function(response){
            $rootScope.awsResponse = response;
            return response;
          });
        });
      } else if(postID && thumb) {
        postRails(makeThumbPayload(postID),postId,'/thumbnails').then(function(response){
          $http.post(AmazonBucket, buildFormData(imageFile), {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Authorization':'' }
          }).then(function(response){
            $rootScope.awsResponse = response;
            return response;
          });
        });
      } else if(postID && featured){
        postRails(makeFeaturePayload(postID),postId,'/featured_images').then(function(response){
          $http.post(AmazonBucket, buildFormData(imageFile), {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Authorization':'' }
          }).then(function(response){
            $rootScope.awsResponse = response;
            return response;
          });
        });
      } else {
        $http.post(AmazonBucket, buildFormData(imageFile), {
          transformRequest: angular.identity,
          headers: { 'Content-Type': undefined, 'Authorization':'' }
        }).then(function(response){
          $rootScope.awsResponse = response;
          return response;
        });
      }
    });
  };

  var makeImagePayload = function(postId){
    var imagePayload = {
      image: {
        post_id: postId,
        url: AmazonBucket+signKeyResults.key,
      }
    };
    return imagePayload;
  };

  var makeThumbPayload = function(postId){
    var thumbPayload = {
      thumbnail: {
        post_id: postID,
        url: AmazonBucket+signKeyResults.key
      }
    };
    return thumbPayload;
  };

  var makeFeaturePayload = function(postId){
    var featurePayload = {
      featured_image: {
        post_id: postID,
        url: AmazonBucket+signKeyResults.key
      }
    };
    return featurePayload;
  };

  var postRails = function(params,postId,route){
    return $q(function(resolve,reject){
      $http.post(ServerUrl+'posts/'+postId+route, params).success(function(response){
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