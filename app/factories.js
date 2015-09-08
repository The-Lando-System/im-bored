myApp.factory('AuthService', function ($http,$cookies) {
	var authService = {};

	authService.login = function (credentials) {
		return $http.post('/authenticate', credentials)
		.then(function (res) {
			return res.data.user;
		});
	};

	authService.create = function (newUser) {
		return $http.post('/create-account', newUser)
		.then(function (res) {

		});
	};
 
	authService.isAuthenticated = function () {
		return ($cookies.get("userId")) ? true : false;
	};

	authService.getUserId = function () {
		return ($cookies.get("userId")) ? $cookies.get("userId") : null;
	};

	authService.logout = function () {
		return $cookies.remove("userId");
	};

	return authService;

	

});