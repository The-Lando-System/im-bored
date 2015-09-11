myApp.controller('MyListController', function ($scope,$http,AuthService,WhatDoService) {

	angular.element(document).ready(function () {
        angular.element('.main-header h1').animate({'opacity': '1'},1000);
    });

	$scope.isAuthenticated = AuthService.isAuthenticated();
	$scope.header = !AuthService.isAuthenticated() ? "My List" : "My List - " + AuthService.getUserId();
	$scope.whatToDo = "...";
	$scope.showLoginModal = false;
	$scope.showManageModal = false;
	$scope.showAddModal = false;
	$scope.showCreateAccountModal = false;

	$scope.setHeader = function(header) {
		$scope.header = header;
	};

	$scope.whatDo = function(){
		WhatDoService.getWhatDo('/my-what-to-dos/' + AuthService.getUserId(),$scope.whatToDo)
		.then(function(){
			$scope.whatToDo = WhatDoService.whatToDo;
		});
	};

	$scope.logout = function() {
		AuthService.logout();
		$scope.isAuthenticated = false;
		$scope.header = "My List";
		$scope.whatToDo = "...";
		$scope.manageModal();
	};

	$scope.deleteList = function() {
		WhatDoService.deleteAllWhatDos('/delete-all/' + AuthService.getUserId())
		.then(function(){
			$scope.whatToDo = "...";
			$scope.manageModal();
		});
	};

	$scope.setAuthentication = function(isAuth){
		$scope.isAuthenticated = isAuth;
	};

	$scope.loginModal = function(){
		$scope.showLoginModal = !$scope.showLoginModal;
	};

	$scope.createAccountModal = function(){
		$scope.showCreateAccountModal = !$scope.showCreateAccountModal;
	};

	$scope.manageModal = function(){
		$scope.showManageModal = !$scope.showManageModal;
	};
	
	$scope.addModal = function(){
		$scope.showAddModal = !$scope.showAddModal;
	};

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
		// Call the parent controller logout function
		$scope.$parent.$parent.logout();
	};

	$scope.deleteList = function() {
		var yes = confirm('Are you sure you want to delete your list?');
		if (yes) {
			// Call the parent controller logout function
			$scope.$parent.$parent.deleteList();
		}
	};
});