'use strict';
describe('AWSFactory tests', function (){
  var AWSFactory, $rootScope, deferred;

  beforeEach(function (){
    module('jwwebApp');
    inject(function(_AWSFactory_,_$rootScope_, $q) {
      AWSFactory = _AWSFactory_;
      $rootScope = _$rootScope_;
      deferred = $q.defer();
      deferred.resolve(JSON);
      spyOn(AWSFactory, 'prepareKey').andReturn(deferred.promise);
    });
  });
  
  it('should have an prepareKey function', function () {
    expect(angular.isFunction(AWSFactory.prepareKey)).toBe(true);
  });
  
  it('should result of AWSFactory.prepareKey to be JSON', function (){
    var value;
    deferred.promise.then(function(_value_){
      value = _value_;
    });
    deferred.resolve(JSON);
    expect(value).not.toBe(JSON);
    $rootScope.$digest();
    expect(value).toBe(JSON);
  });
});

/*
beforeEach(function() {
  inject(function(_someService_, _$q_, _$rootScope) {
    var deferred = _$q_.defer();
 
    someService = _someService;
    rootScope = _$rootScope_;
 
    deferred.resolve('resolveData');
    spyOn(someService, 'loadData').andReturn(deferred.promise);
  })
})
 
it('is now a lot easier', function() {
  controllerScope.someMethod();
  rootScope.$apply();
  expect(controllerScope.data).toBe('resolveData');
}

*/
/*
describe('how to test with promises', function () {
  var deferred;

  beforeEach(function () {
    inject(function($q) {
      deferred = $q.defer();
    });
  });

  it('does a thing one way', function () {
    deferred.promise.then(function (value) {
      expect(value).toBe(4);
    });
    deferred.resolve(10);
    $rootScope.$digest();
  });

  it('does a thing another way', function () {
    var handler = jasmine.createSpy('success');
    deferred.promise.then(handler);
    deferred.resolve(10);
    $rootScope.$digest();
    expect(handler).toHaveBeenCalledWith(4);
  });
});

*/