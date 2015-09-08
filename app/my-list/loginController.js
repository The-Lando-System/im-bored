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
			$scope.$parent.$parent.setHeader("My List - " + user.id);

		}, function () {
			alert("Could not find user or incorrect password!");
		});
	};

});