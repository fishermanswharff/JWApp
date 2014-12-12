'use strict';
describe('Unit: MainController', function() {
  beforeEach(module('jwwebApp'));

  var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope) {
      // Create a new scope that's a child of the $rootScope
      scope = $rootScope.$new();
      // Create the controller
      ctrl = $controller('MainController', {
        $scope: scope
      });
    }));

    it('should create $scope.greeting when calling sayHello', function() {
        expect(scope.greeting).toBeUndefined();
        scope.sayHello();
        expect(scope.greeting).toEqual('Hello Ari');
    });
});

describe('PhoneCat controllers', function() {

  describe('PhoneListCtrl', function(){

    beforeEach(function() {
      module('phonecatApp'); // <= initialize module that should be tested
    });

    it('should create "phones" model with 3 phones', inject(function($controller) {
      var scope = {},
          ctrl = $controller('PhoneListCtrl', { $scope: scope });

      expect(scope.phones.length).toBe(3);
    }));
  });
});