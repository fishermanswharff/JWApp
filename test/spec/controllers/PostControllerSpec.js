'use strict';
describe('Controller: PostController', function () {

  // load the controller's module
  beforeEach(module('jwwebApp'));
  beforeEach(module('MainController'));

  var PostViewController, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope) {
      // Create a new scope that's a child of the $rootScope
      scope = $rootScope.$new();
      // Create the controller
      PostViewController = $controller('PostViewController', {
        $scope: scope
      });
    }));
    
    it('should get the parameters from the form',function(){
      
    });
});

