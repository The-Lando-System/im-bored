myApp.factory('AuthService', function ($http,$cookies) {
	var authService = {};

	authService.login = function (credentials) {
		return $http
		.post('/authenticate', credentials)
		.then(function (res) {
			return res.data.user;
		});
	};
 
	authService.isAuthenticated = function () {
		return ($cookies.get("userId")) ? true : false;
	};

	authService.getUserId = function () {
		return ($cookies.get("userId")) ? $cookies.get("userId") : null;
	};

	return authService;

});