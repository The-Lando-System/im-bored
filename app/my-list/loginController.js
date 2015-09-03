myApp.controller('LoginController', function ($scope,$rootScope,$cookies,AUTH_EVENTS,AuthService) {

	$scope.credentials = {
	    username: '',
	    password: ''
  	};

	$scope.login = function(credentials) {

		alert("Hello!\nUsername: " + credentials.username + "\nPassword: " + credentials.password);
		$scope.$parent.$parent.loginModal();
		$scope.credentials = {username:"",password:""};
		// AuthService.login(credentials)
		// .then(function (user) {
		// 	$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		// 	$scope.setCurrentUser(user);
		// 	$cookies.put('userId',user.id);
		// 	$cookies.put('userRole',user.role);

		// 	$scope.$parent.$parent.loginModal();

		// }, function () {
		// 	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		// });
	};

})

.factory('AuthService', function ($http, Session) {
	var authService = {};

	authService.login = function (credentials) {
		return $http
		.post('/authenticate', credentials)
		.then(function (res) {
			Session.create(res.data._id, res.data.user.id, res.data.user.role);
			return res.data.user;
		});
	};
 
	authService.isAuthenticated = function () {
		return !!Session.userId;
	};
	 
	authService.isAuthorized = function (authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
	};

	return authService;

})

.service('Session', function () {
	this.create = function (sessionId, userId, userRole) {
		this.id = sessionId;
		this.userId = userId;
		this.userRole = userRole;
	};
	this.destroy = function () {
		this.id = null;
		this.userId = null;
		this.userRole = null;
	};
})

.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	editor: 'editor',
	guest: 'guest'
});