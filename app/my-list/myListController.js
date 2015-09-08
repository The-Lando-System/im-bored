myApp.controller('MyListController', function ($scope,$http,AuthService) {

	$scope.header = !AuthService.isAuthenticated() ? "My List" : "My List - " + AuthService.getUserId();
	$scope.whatToDo = "...";

	$scope.whatDo = function(){
		$http.get('/my-what-to-dos/' + AuthService.getUserId()).success(function(data) {
			var randomIndex = randomInt(0,data.length);

			while (data[randomIndex].description === $scope.whatToDo && (data.length > 1)) {
				randomIndex = randomInt(0,data.length);
			}

  	  		$scope.whatToDo = data[randomIndex].description;
  		});
	};

	$scope.showLoginModal = false;
	$scope.loginModal = function(){
		$scope.showLoginModal = !$scope.showLoginModal;
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
		AuthService.logout();
		$scope.isAuthenticated = false;
		$scope.header = "My List";
		$scope.whatToDo = "...";
	};

});

// TO-DO : Make this a common controller for both user and global lists
myApp.controller('AddNewItemMyListModalController', function ($scope,$http,AuthService) {


	$scope.addNew = function(){

		if ($scope.newDesc.trim() === "") {
			alert("Please add a description.");
			$scope.newDesc = "";
			return;
		}

		if (!AuthService.isAuthenticated()) {
			alert("Error! User is not logged in!");
			return;
		}

		var today = new Date();

		var newWhatToDo = {
			userId: AuthService.getUserId(),
			description: $scope.newDesc.trim(),
			dateAdded: today.toISOString()
		};
		
		$http.post('/my-list/add-what-to-do', newWhatToDo)
		.success(function(data, status, headers, config) {
			$scope.newDesc = "";
			$scope.$parent.$parent.addModal();
		});
		
	};

});