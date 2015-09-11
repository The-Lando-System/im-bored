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

myApp.factory('WhatDoService', function ($http) {
	var whatDoService = {};

	whatDoService.addNewWhatDo = function(url,newWhatToDo) {

		if (newWhatToDo.description.trim() === "") {
			alert("Please add a description.");
			return;
		}

		var today = new Date();
		newWhatToDo.dateAdded = today.toISOString();

		return $http.post(url, newWhatToDo)
		.success(function(data, status, headers, config) {
			alert("Successfully added new item!");
		});

	};

	whatDoService.getWhatDo = function(url,whatToDo){
		return $http.get(url).success(function(data) {

			if (data.length > 0){

				var randomIndex = randomInt(0,data.length);
				while (data[randomIndex].description === whatToDo && (data.length > 1)) {
					randomIndex = randomInt(0,data.length);
				}
	  	  		whatDoService.whatToDo = data[randomIndex].description;

  	  		} else {
  	  			whatDoService.whatToDo = "...";
  	  		}
  		});
	};

	whatDoService.deleteAllWhatDos = function(url){
		return $http.delete(url).success(function(data) {
			
  		});
	};

	var randomInt = function(minNum,maxNum){
		return Math.floor((Math.random() * (maxNum-minNum))) + minNum;
	};


	return whatDoService;
});