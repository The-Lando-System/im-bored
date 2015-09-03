myApp.controller('MyListController', function ($scope,$http) {

	$scope.header = "My List";

	$scope.showLoginModal = false;
	$scope.loginModal = function(){
		$scope.showLoginModal = !$scope.showLoginModal;
	};

});