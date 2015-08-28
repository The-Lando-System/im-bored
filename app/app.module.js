'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}])

.controller('ApplicationController',
function ($scope) {
	$scope.header = "I'm Bored...";
	$scope.whatToDo = "";

	$scope.whatDo = function(){
		$scope.whatToDo = "You should build a website.";
	};

});
