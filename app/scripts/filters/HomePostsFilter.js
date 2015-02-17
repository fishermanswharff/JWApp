'use strict';
angular.module('jwwebApp').filter('postsFilter',['PostsFactory','trace',function(PostsFactory,trace){
  return function(objects, criteria){
    var posts = PostsFactory.posts;
    var filterResult = [];
    if(!criteria) { return objects; }
    for(var i = 0; i < posts.length; i++){
      if(posts[i].categories.length > 0){
        for(var j = 0; j < posts[i].categories.length; j++){
          if(posts[i].categories[j].name === criteria && filterResult.indexOf(posts[i] !== -1)) {
            filterResult.push(posts[i]);
          }
        }
      }
    }
    trace(filterResult);
    return filterResult;
  };
}]);