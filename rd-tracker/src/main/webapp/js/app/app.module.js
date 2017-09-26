var app = angular.module("JavaEEApp", ['ngRoute']);

app.controller("MainController", function($scope, $http, $location){
	$scope.message = "This is a Java EE Application";
	$scope.getNavClass = function(nav){
		return $location.path() == nav;
	}
	
	loadApplications = function(){
		$http.get("webservices/applications/").then(function(response){
			$scope.applications = response.data;
		});
	}
	loadApplications();
});