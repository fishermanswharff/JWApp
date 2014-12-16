'use strict';
describe('Controller: PostController', function () {

  // load the controller's module
  beforeEach(module('jwwebApp'));
  beforeEach(module('MainController'));

  var authRequestHandler, createController, scope, $location, $routeParams, mockBackend, ServerUrl, $window, $rootScope, $controller;

  /* EXPECTATIONS FOR THE POSTVIEWCONTROLLER
  ——————————————————————————————————————————
  the post view controller can find all its dependencies and inject them correctly
  The post view controller can find the post based on the route params
  the controller correctly saves the response and names the variables on scope
  */

  // inject the $controller and $rootScope services in the beforeEach block
  beforeEach(inject(function($injector) {

    // this is the fake backend, so that you can control the requests and responses from the server
    mockBackend = $injector.get('$httpBackend');
    ServerUrl = $injector.get('ServerUrl');
    $location = $injector.get('$location');
    $routeParams = $injector.get('$routeParams');
    $window = $injector.get('$window');
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    scope = $rootScope.$new();
    
    createController = function(){
      return $controller('PostViewController', { $scope: scope, $routeParams: { postId: '1' } });
    };

    // backend definition common for all tests
    authRequestHandler = mockBackend.when('GET', ServerUrl + 'posts/' + $routeParams.postId).respond({
      id: 1,
      title: 'TIL: binary trees with nothing',
      body: '<h5>Euismod Aenean Ornare Malesuada Inceptos</h5><pre><code>class BinaryTree<br><br>  attr_accessor :value, :right_branch, :left_branch<br> def initialize(value)<br>@value = value<br>@left_branch = nil<br>@right_branch = nil<br>end<br><br>def insert(value)<br>if value > @value<br> @right_branch ? @right_branch.insert(value) : @right_branch = BinaryTree.new(value)<br><br>elsif value < @value<br> @left_branch ? @left_branch.insert(value) : @left_branch = BinaryTree.new(value)<br>else<br>  "world ends"<br>end<br> end<br>end</code></pre>',
      userId: 1,
      images: [],
      categories: [],
      createdAt: 'Mon, 15 Dec 2014 00:27:00 UTC +00:00',
      updatedAt: 'Mon, 15 Dec 2014 00:27:00 UTC +00:00'
    });
  }));

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
  });


  it('should fetch the post', function() {
    mockBackend.expectGET(ServerUrl + 'posts/1').respond('201','');

    var controller = createController();
    mockBackend.flush();
    console.log(controller);
  });
});