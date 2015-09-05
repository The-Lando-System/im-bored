myApp.controller('LoginController', function ($scope,$rootScope,$cookies,AuthService) {

	$scope.credentials = {
	    username: '',
	    password: ''
  	};

	$scope.login = function(credentials) {

		AuthService.login(credentials)
		.then(function (user) {

			$cookies.put('userId',user.id);
			$scope.$parent.$parent.loginModal();
			$scope.credentials = {username:"",password:""};
			$scope.$parent.$parent.hideLogin();
			alert("Hello!\nUser: " + user.id + "\nhas logged in!");

		}, function () {
			alert("ERROR\nCould not find the user: " + credentials.username);
		});
	};

});