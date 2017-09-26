app.config(function($routeProvider){
	$routeProvider.
	when("/", {templateUrl:'html/default.html', controller:'MainController'}).
	when("/user/index", {templateUrl:'html/user/index.html', controller:'UserController'}).
	otherwise({redirectTo:'/'});
});


