myApp.controller('ApplicationController', function ($scope, $state, $cookies) {
	
	$scope.currState = $state;

    $scope.$watch('currState.current.name', function(newValue, oldValue) {
      if (newValue === "home"){
      	$scope.url = "#/my-list";
      	$scope.linkText = "Access your own list";
      }
      if (newValue === "my-list"){
      	$scope.url = "#/main";
      	$scope.linkText = "Back to main list";
      }
    }); 
    
});