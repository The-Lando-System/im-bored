myApp.controller('MyListController', function ($scope,$http,AuthService,WhatDoService) {

	$scope.header = !AuthService.isAuthenticated() ? "My List" : "My List - " + AuthService.getUserId();
	$scope.whatToDo = "...";

	$scope.whatDo = function(){
		WhatDoService.getWhatDo('/my-what-to-dos/' + AuthService.getUserId(),$scope.whatToDo)
		.then(function(){
			$scope.whatToDo = WhatDoService.whatToDo;
		});
	};

	$scope.showLoginModal = false;
	$scope.loginModal = function(){
		$scope.showLoginModal = !$scope.showLoginModal;
	};

	$scope.showManageModal = false;
	$scope.manageModal = function(){
		$scope.showManageModal = !$scope.showManageModal;
	};

	$scope.hideLogin = function(){
		$scope.isAuthenticated = true;
	};

	$scope.isAuthenticated = AuthService.isAuthenticated();

	$scope.showAddModal = false;
	$scope.addModal = function(){
		$scope.showAddModal = !$scope.showAddModal;
	};


	var randomInt = function(minNum,maxNum){
		return Math.floor((Math.random() * (maxNum-minNum))) + minNum;
	};

	$scope.showCreateAccountModal = false;
	$scope.createAccountModal = function(){
		$scope.showCreateAccountModal = !$scope.showCreateAccountModal;
	};

	$scope.hideCreateAccount = function(){
		$scope.isAuthenticated = true;
	};

	$scope.setHeader = function(header) {
		$scope.header = header;
	};

	$scope.logout = function() {
		// var yes = confirm('Are you sure you want to logout?');
		// if (yes) {
			AuthService.logout();
			$scope.isAuthenticated = false;
			$scope.header = "My List";
			$scope.whatToDo = "...";
			$scope.manageModal();
		// }
	};

	angular.element(document).ready(function () {
        angular.element('.main-header h1').animate({'opacity': '1'},1000);
    });

});

myApp.controller('AddNewItemMyListModalController', function ($scope,$http,AuthService,WhatDoService) {

	$scope.newWhatToDo = {
		userId: "",
		description: "",
		dateAdded: ""
	};

	$scope.addNew = function(){

		if (!AuthService.isAuthenticated()) {
			alert("Error! User is not logged in!");
			return;
		}

		$scope.newWhatToDo.userId = AuthService.getUserId();

		WhatDoService.addNewWhatDo('/my-list/add-what-to-do',$scope.newWhatToDo)
		.then(function(){
			$scope.newWhatToDo.description = "";
			$scope.$parent.$parent.addModal();
		});
	};

});

myApp.controller('ManageModalController', function ($scope,$http,AuthService,WhatDoService) {
	$scope.logout = function() {
		var yes = confirm('Are you sure you want to logout?');
		if (yes) {
			$scope.$parent.$parent.logout();
		}
	};
});