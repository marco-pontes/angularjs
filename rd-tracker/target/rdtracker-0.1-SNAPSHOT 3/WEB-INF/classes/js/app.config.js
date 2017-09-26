app.config(function($routeProvider){
	$routeProvider.
	when("/", {templateUrl:'resources/html/default.html', controller:'MainController'}).
	when("/user/create", {templateUrl:'resources/html/user/create.html', controller:'UserController'}).
	otherwise({redirectTo:'/'});
});


