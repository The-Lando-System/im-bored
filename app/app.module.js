'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}])

.controller('ApplicationController',
function ($scope,$http) {
	$scope.header = "I'm Bored...";
	$scope.whatToDo = "";

	$scope.whatDo = function(){
		$http.get('/all-what-to-dos').success(function(data) {
			var randomIndex = randomInt(0,data.length);

			while (data[randomIndex].description === $scope.whatToDo) {
				randomIndex = randomInt(0,data.length);
			}

  	  		$scope.whatToDo = data[randomIndex].description;
  		});
	};

	var randomInt = function(minNum,maxNum){
		return Math.floor((Math.random() * (maxNum-minNum))) + minNum;
	};

	// insert data
	// db.whatToDos.insert( { "description": "Build a website", "dateAdded": ISODate("2015-08-28T00:00:00Z") } )

});
