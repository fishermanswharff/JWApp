'use strict';
describe('Controller: PostController', function() {

  beforeEach(module('jwwebApp'));
  beforeEach(module('MainController'));

  var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope) {
      // Create a new scope that's a child of the $rootScope
      scope = $rootScope.$new();
      // Create the controller
      ctrl = $controller('PostController', {
        $scope: scope
      });
    }));
    
    it('should get the parameters from the form',function(){
      
    });
});
