myApp.controller('CreateAccountController', function ($scope,$rootScope,$cookies,$http,AuthService) {

	$scope.newAccount = {
		username: "",
		password: "",
		passwordConfirm: ""
	};

	$scope.createAccount = function() {

		if ($scope.newAccount.username.trim() === ""){
			alert('Please enter a username');
			$scope.newAccount.username = "";
			return;
		}
		if ($scope.newAccount.password.trim() === "") {
			alert('Please enter a password');
			$scope.newAccount.password = "";
			return;
		}
		if ($scope.newAccount.passwordConfirm.trim() === ""){
			alert('Please confirm your password');
			$scope.newAccount.passwordConfirm = "";
			return;
		}
		if ($scope.newAccount.password !== $scope.newAccount.passwordConfirm) {
			alert("Your passwords do not match!");
			$scope.newAccount.password = "";
			$scope.newAccount.passwordConfirm = "";
			return;
		}
	
		// Handling for determining a unique username
		$http.get('/user-exists/' + $scope.newAccount.username)
		.then(function (res) {
			userExists = res.data;
			if (userExists){
				alert('An account already exists for the username: ' + $scope.newAccount.username);
				$scope.newAccount = {
					username: "",
					password: "",
					passwordConfirm: ""
				};
				return;
			} else {

				// Create the user
				AuthService.create($scope.newAccount)
				.then(function() {
					
					// Login as the newly created user
					AuthService.login({
						'username': $scope.newAccount.username,
						'password': $scope.newAccount.password
					})
					.then(function(user) {
						$cookies.put('userId',user.id);
						$scope.$parent.$parent.createAccountModal();
						$scope.newAccount = {username:"",password:"",passwordConfirm:""};
						$scope.$parent.$parent.setAuthentication(true);
						$scope.$parent.$parent.setHeader("My List - " + user.id);
					});
				});
			}
		});
	};


});