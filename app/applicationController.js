myApp.controller('ApplicationController', function ($scope, $state, $cookies) {
	
	$scope.currState = $state;

  var linkIcon = angular.element('.links a i');

    $scope.$watch('currState.current.name', function(newValue, oldValue) {
      if (newValue === "home"){
      	$scope.url = "#/my-list";
      	$scope.linkText = "Access your own list";
        linkIcon.removeClass('fa-globe');
        linkIcon.addClass('fa-list');
      }
      if (newValue === "my-list"){
      	$scope.url = "#/main";
      	$scope.linkText = "Back to global list";
        linkIcon.addClass('fa-globe');
        linkIcon.removeClass('fa-list');
      }
    });
    
});