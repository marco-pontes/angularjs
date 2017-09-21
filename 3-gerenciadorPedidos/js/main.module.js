var app = angular.module("gerenciadorPedidos", ["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/gerenciador", {templateUrl:"gerenciador.html", controller: "GerenciadorCtrl"});
	$routeProvider.when("/pedidos", {templateUrl:"pedidos.html", controller: "PedidosCtrl"});
	$routeProvider.otherwise({redirectTo: "/gerenciador"});
});



var app = angular.module('mainApp', ['ngRoute']);

 app.controller('MainController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
 })

 .controller('GeneralController', function($scope, $routeParams) {
     $scope.name = "GeneralController";
     $scope.params = $routeParams;
 })

 .controller('FormsController', function($scope, $routeParams) {
     $scope.name = "FormsController";
     $scope.params = $routeParams;
     $scope.hasErrors = false;
     
     $scope.submit = function(){
    	 $scope.hasErrors = true;
     }
     $scope.cancel = function(){
    	 $scope.hasErrors = false;
     }
 })
 
 .controller('TypographyController', function($scope, $routeParams) {
	 $scope.name = "GeneralController";
	 $scope.params = $routeParams;
 })

  .controller('TablesController', function($scope, $routeParams) {
     $scope.name = "TablesController";
     $scope.params = $routeParams;
 })
 
 .controller('ComponentsController', function($scope, $routeParams) {
	 $scope.name = "ComponentsController";
	 $scope.params = $routeParams;
     $("[data-toggle=popover]").popover();
 })

.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/general/', {
    disableCache: true,
    templateUrl: function (params) {
        return '/ezmarket/jsp/example/general.jsp?' + $.now();
    },
    controller: 'GeneralController',
    useAsDefault: true,
    resolve: {
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 0);
        return delay.promise;
      }
    }
  })
  .when('/forms/', {
	disableCache: true,
    templateUrl: function (params) {
        return '/ezmarket/jsp/example/forms.jsp?' + $.now();
    },
    controller: 'FormsController'
  })
  .when('/typography/', {
	  disableCache: true,
	  templateUrl: function (params) {
		  return '/ezmarket/jsp/example/typography.jsp?' + $.now();
	  },
	  controller: 'TypographyController'
  })

  .when('/components/', {
	  disableCache: true,
	    templateUrl: function (params) {
	        return '/ezmarket/jsp/example/components.jsp?' + $.now();
	    },
    controller: 'ComponentsController'
  })
  
  .when('/tables/', {
	  disableCache: true,
	  templateUrl: function (params) {
		  return '/ezmarket/jsp/example/tables.jsp?' + $.now();
	  },
	  controller: 'TablesController'
  })
  .otherwise({redirectTo : '/examples'});
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});