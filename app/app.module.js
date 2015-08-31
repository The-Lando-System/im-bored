'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
	'ngRoute',
	'ui.router'
])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/main',
		controller: 'ApplicationController'
	})
	.state('my-list', {
		url: '/my-list',
		templateUrl: '/my-list',
		controller: 'MyListController'
	});

}]);
