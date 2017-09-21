app.controller("GerenciadorCtrl", function ($scope, GerenciadorAPI){

	$scope.carregaCardapio = function(){
		GerenciadorAPI.getCardapio().success(
			function(data, code){
				$scope.itens = data;
			}
		);
	}

	$scope.criaPedido = function(pedido){
		pedido.data = new Date();
		GerenciadorAPI.adicionaPedido(pedido).success($scope.carregaCardapio);
	}

	$scope.apagaPedido = function(pedido){
		
	}

	$scope.carregaCardapio();

});

app.factory("GerenciadorAPI", function($http){
	var _getCardapio = function(){
		return $http.get("http://www.agilecode.com.br/cardapio.php");
	}
	var _adicionaPedido = function(pedido){
		return $http.post("http://www.agilecode.com.br/pedido.php", pedido);
	}
	return {getCardapio:_getCardapio, adicionaPedido:_adicionaPedido};
});

app.filter("*", function(){
	return function(input, numero){
		var resultado = ''; 
		console.log(input);
		for(var i = 0; i < numero; i++){
			resultado += input;
		}
		return resultado;
	}
});


app.directive("teste", function(){
	return {
		templateUrl: "teste.html",
		restrict: 'E',
		scope: {
			texto: "@texto"
		}
	}
});