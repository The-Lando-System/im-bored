myApp.controller('MainController', function ($scope,$http,WhatDoService) {

	$scope.header = "I'm Bored...";
	$scope.whatToDo = "...";

	$scope.whatDo = function(){
		WhatDoService.getWhatDo('/all-what-to-dos',$scope.whatToDo)
		.then(function(){
			$scope.whatToDo = WhatDoService.whatToDo;
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

myApp.controller('AddNewItemModalController', function ($scope,$http,WhatDoService) {

	$scope.newWhatToDo = {
		description: "",
		dateAdded: ""
	};

	$scope.addNew = function(){
		WhatDoService.addNewWhatDo('/add-what-to-do',$scope.newWhatToDo)
		.then(function(){
			$scope.newWhatToDo.description = "";
			$scope.$parent.$parent.modal();
		});
	};

});