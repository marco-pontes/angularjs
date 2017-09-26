app.config(function($routeProvider){
	$routeProvider. 
	when("/", {templateUrl:'html/summary.html', controller:'MainController'}).
	when("/application/create", {templateUrl:'html/application/create.html', controller:'ApplicationCreateController'}).
	when("/application/show/:appId", {templateUrl:'html/application/view.html', controller:'ApplicationViewController'}).
	otherwise({redirectTo:'/'});
});


