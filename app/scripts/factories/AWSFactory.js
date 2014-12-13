'use strict';
angular.module('jwwebApp').factory('AWSFactory',function($http,$q,ServerUrl,AmazonBucket,trace){

  var signKeyResults;

  var prepareKey = function(imageFile, postId){
    return $http.get(ServerUrl + 'amazon/sign_key').success(function(response){
      signKeyResults = response;
      var imagePayload = {
        image: {
          post_id: postId,
          url: AmazonBucket+signKeyResults.key,
        }
      };
      $q.all(postRails(imagePayload, postId)).then(function(){
        postImageData(imageFile);
      });
    });
  };

  var postRails = function(params,postId){
    var promises = [];
    promises.push($http.post(ServerUrl+'posts/'+postId+'/images', params));
  };

  var postImageData = function(imageFile){
    var formdata = new FormData();
    formdata.append('key',signKeyResults.key);
    formdata.append('AWSAccessKeyId',signKeyResults.access_key);
    formdata.append('policy',signKeyResults.policy);
    formdata.append('acl','public-read');
    formdata.append('signature',signKeyResults.signature);
    formdata.append('Content-Type','image/jpeg');
    formdata.append('file',imageFile)

    $http.post(AmazonBucket, formdata, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization':'',
      }
    }).success(function(response){
      trace(response, 'congratulations, hashtag winning');
    }).error(function(data, status, headers, config){
      trace(data, status, headers, config, 'failed posting to AWS');
    });
  };

  return {
    prepareKey: prepareKey
  };
});