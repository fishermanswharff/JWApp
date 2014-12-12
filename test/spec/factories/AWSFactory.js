'use strict';

describe('Factory: AWSFactory',function(){

  beforeEach(module('jwwebApp'));

  var AWSFactory,
    scope;

  beforeEach(inject(function ($factory,$rootScope){
    scope = $rootScope.$new();
    AWSFactory = $factory('AWSFactory',{
      $scope: scope
    });
  }));

  it('should have multipart form data',function(){
    expect();
  });

});