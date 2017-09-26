var app = angular.module("JavaEEApp", ['ngRoute']);

app.controller("MainController", function($scope, $location){
	$scope.message = "This is a Java EE Application";
	$scope.getNavClass = function(nav){
		return $location.path() == nav;
	}
});