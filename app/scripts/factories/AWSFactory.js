'use strict';
angular.module('jwwebApp').factory('AWSFactory',function($http,$q,ServerUrl,AmazonBucket,trace){
  // .constant('AmazonBucket','http://dubya-blog-bucket.s3.amazonaws.com/');  

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

      trace(signKeyResults.access_key);
      var data = {
        Policy: signKeyResults.policy,
        Signature: signKeyResults.signature,
        acl: signKeyResults.acl,
        success_action_status: signKeyResults.sas,
        AWSAccessKeyId: signKeyResults.access_key,
        key: signKeyResults.key,
      }
      $q.all(postRails(imagePayload, postId)).then(function(){
        postImageData(data,imageFile);
      });
    });
  };

  var postRails = function(params,postId){
    var promises = [];
    promises.push($http.post(ServerUrl+'posts/'+postId+'/images', params));
  };

  var postImageData = function(data,imageFile){
    
    // debugger;
    
    var req = $http({
      headers: {
        'content-type': false,
        'Authorization':'',
        'processData': false,
      },
      method: 'POST',
      url: AmazonBucket,
      params: $.param(data),
      data: imageFile,
      transformRequest: transformRequest(imageFile),
      cache: false,
      timeout: 5000,
      withCredentials: false
    }).success(function(response){
      trace(response)
    }).error(function(data, status, headers, config){
      trace(data, status, headers, config, 'failed posting to AWS');
    });
  };

  var transformRequest = function(data){
    var fd = new FormData();
    angular.forEach(data, function(value, key) {
      fd.append(key, value);
      debugger;
    });
    return fd;
  };

  return {
    prepareKey: prepareKey
  };
});


/*


$.ajax({
      url: AmazonBucket,
      type: 'POST',
      params: imageData,
      processData: false,
      contentType: 'multipart/form-data',
    }).done(function(response){
      trace(response);
    }).error(function(jqXHR,textStatus,errorThrown){
      trace(jqXHR,textStatus,errorThrown);
    });


$http.post(ServerUrl+'posts/'+postId+'/images', imagePayload).success(function(response){
  trace(imageData);
  imageData.append('file', imageFile);
  imageData.append('Policy', signKeyResults.policy);
  imageData.append('Signature', signKeyResults.signature);
  imageData.append('acl', signKeyResults.acl);
  imageData.append('success_action_status', signKeyResults.sas);
  imageData.append('AWSAccessKeyId', signKeyResults.access_key);
  imageData.append('key', signKeyResults.key);
  $q.all(postImageData(imageData,signKeyResults,key)).then(function(){
    trace('posted image data');
  });
});




$q.all(buildKey(response, postId)).then(function(){
  var imageData = new FormData();
  $http.post(ServerUrl+'posts/'+postId+'/images', imagePayload).success(function(response){
    trace(imageData);
    imageData.append('file', imageFile);
    imageData.append('Policy', signKeyResults.policy);
    imageData.append('Signature', signKeyResults.signature);
    imageData.append('acl', signKeyResults.acl);
    imageData.append('success_action_status', signKeyResults.sas);
    imageData.append('AWSAccessKeyId', signKeyResults.access_key);
    imageData.append('key', signKeyResults.key);
    trace(imageData);
    $http.post(AmazonBucket,imageData).success(function(response){
      trace(response);
    }).error(function(data, status, headers, config){ trace(data, status, headers, config, 'failed posting to AWS') });
  }).error(function(data, status, headers, config){ trace(data, status, headers, config, 'failed posting to Rails Server') });
});



*/