'use strict';
describe('Controller: AboutController', function () {

  // load the controller's module
  beforeEach(module('jwwebApp'));
  beforeEach(module('MainController'));

  var AboutController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutController = $controller('AboutController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  it('should attach a list of stupidThings to the scope',function(){
    expect(scope.stupidThings.length).toBe(4);
  });
});
