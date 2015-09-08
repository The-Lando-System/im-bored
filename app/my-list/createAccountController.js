myApp.controller('CreateAccountController', function ($scope,$rootScope,$cookies,$http,AuthService) {

	$scope.newAccount = {
		username: "",
		password: "",
		passwordConfirm: ""
	};

	$scope.createAccount = function() {
	
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

				// Confirm that the passwords match
				if ($scope.newAccount.password !== $scope.newAccount.passwordConfirm) {
					alert("Your passwords do not match!");
					$scope.newAccount.password = "";
					$scope.newAccount.passwordConfirm = "";
					return;
				}

				// Create the user
				AuthService.create($scope.newAccount)
				.then(function() {
				});

				// Login as the newly created user
				AuthService.login({
					'username': $scope.newAccount.username,
					'password': $scope.newAccount.password
				})
				.then(function(user) {
					$cookies.put('userId',user.id);
					$scope.$parent.$parent.createAccountModal();
					$scope.newAccount = {username:"",password:"",passwordConfirm:""};
					$scope.$parent.$parent.hideCreateAccount();
					$scope.$parent.$parent.setHeader("My List - " + user.id);
				});
			}
		});
	};


});