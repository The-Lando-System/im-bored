myApp.controller('LoginController', function ($scope,$rootScope,$cookies,AuthService) {

	$scope.credentials = {
	    username: '',
	    password: ''
  	};

	$scope.login = function() {

		if ($scope.credentials.username.trim() === ""){
			alert('Please enter your username');
			$scope.credentials.username = "";
			return;
		}
		if ($scope.credentials.password.trim() === "") {
			alert('Please enter your password');
			$scope.credentials.password = "";
			return;
		}

		AuthService.login($scope.credentials)
		.then(function (user) {
			if (user) {
				$cookies.put('userId',user.id);
				$scope.$parent.$parent.loginModal();
				$scope.credentials = {username:"",password:""};
				$scope.$parent.$parent.setAuthentication(true);
				$scope.$parent.$parent.setHeader("My List - " + user.id);
			} else {
				alert("Could not find user or incorrect password!");
			}
		});
	};

});