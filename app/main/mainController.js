myApp.controller('MainController', function ($scope,$http,WhatDoService) {

	angular.element(document).ready(function () {
        angular.element('.main-header h1').animate({'opacity': '1'},1000);
    });

	$scope.header = "I'm Bored...";
	$scope.whatToDo = "...";
	$scope.showModal = false;

	$scope.whatDo = function(){
		WhatDoService.getWhatDo('/all-what-to-dos',$scope.whatToDo)
		.then(function(){
			$scope.whatToDo = WhatDoService.whatToDo;
		});
	};

	$scope.modal = function(){
		$scope.showModal = !$scope.showModal;
	};

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