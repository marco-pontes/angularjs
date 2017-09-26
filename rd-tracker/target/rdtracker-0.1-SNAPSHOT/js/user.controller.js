app.controller("UserController", function($scope, $location, $http){
	$scope.createUser = function(user){
		$http.post("webservices/users/create", user);
	}
});