'use strict';
angular.module('jwwebApp').filter('postsFilter',['trace',function(trace){
  return function(objects, criteria){
    var filterResult = new Array();
    if(!criteria) return objects;
    for(var index in objects){
      if(objects[index].categories.length > 0){
        $(objects[index].categories).each(function(i,value){
          if(value.name == criteria) filterResult.push(objects[index]);
        });
      }
    }
    return filterResult;
  };
}]);