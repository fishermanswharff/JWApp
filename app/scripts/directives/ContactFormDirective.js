/*global $:false */
'use strict';
angular.module('MainDirective').directive('contactForm',['trace','$http','ServerUrl','$q',function(trace,$http,ServerUrl,$q){
  return {
    restrict: 'EA',
    templateUrl: '../views/contact-form.html',
    link: function($scope,element,attrs){
      
      $scope.message = '';

      $scope.submitContact = function(message){
        $('#contact-submit-button').addClass('submitted');
        $http.post(ServerUrl + 'email/admin',{name: message.name, email: message.email, body: message.body}).success(function(){
          $q.all(assignScope()).then(function(){

          });
          
        }).error(function(){});
      };

      var assignScope = function(){
        
      };

      var clearForm = function(){
        var promises = [];
        promises.push();
        $scope.success = 'Your email was sent successfully.';
        $('#contact-submit-button').removeClass('submitted');
      };
    },
  };
}]);