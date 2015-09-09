myApp.controller('MainController', function ($scope,$http) {

	$scope.header = "I'm Bored...";
	$scope.whatToDo = "...";

	$scope.whatDo = function(){
		$http.get('/all-what-to-dos').success(function(data) {
			var randomIndex = randomInt(0,data.length);

			while (data[randomIndex].description === $scope.whatToDo) {
				randomIndex = randomInt(0,data.length);
			}

  	  		$scope.whatToDo = data[randomIndex].description;
  		});
	};

	$scope.$on('closeModal', function(event, args) {
        $scope.showModal = false;
    });

	$scope.showModal = false;
	$scope.modal = function(){
		$scope.showModal = !$scope.showModal;
	};

	var randomInt = function(minNum,maxNum){
		return Math.floor((Math.random() * (maxNum-minNum))) + minNum;
	};

	angular.element(document).ready(function () {
        angular.element('.main-header h1').animate({'opacity': '1'},1000);
    });
	
});

// TO-DO : Make this a common controller for both user and global lists
myApp.controller('AddNewItemModalController', function ($scope,$http) {

	$scope.newDesc = "";

	$scope.addNew = function(){

		if ($scope.newDesc.trim() === "") {
			alert("Please add a description.");
			$scope.newDesc = "";
			return;
		}

		var today = new Date();

		var newWhatToDo = {
			description: $scope.newDesc.trim(),
			dateAdded: today.toISOString()
		};

		$http.post('/add-what-to-do', newWhatToDo)
		.success(function(data, status, headers, config) {
			alert("Successfully added new item!");
			$scope.newDesc = "";
			$scope.$parent.$parent.modal();
		});

	};

});