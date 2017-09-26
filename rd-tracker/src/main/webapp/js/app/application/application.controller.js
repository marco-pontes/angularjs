app.controller("ApplicationCreateController", function($scope, $location, $http){
	$scope.createApplication = function(user){
		$http.post("webservices/applications/create", user).then(function(){
			$location.path( "/" );
		});
	}
});

app.controller("ApplicationViewController", function($scope, $location, $http, $routeParams, $interval){
	$scope.params = $routeParams;
	show = function(){
		$http.get("webservices/applications/" + $scope.params.appId).then(function(response){
			$scope.application = response.data;
		});
	}
	show();
	$interval(show, 5000);
});