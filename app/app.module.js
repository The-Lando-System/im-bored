'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);
