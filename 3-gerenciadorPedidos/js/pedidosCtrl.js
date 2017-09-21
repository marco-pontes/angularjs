app.controller("PedidosCtrl", function ($scope, $http){

	$scope.valorTotal = 0;
	$scope.numPedidos = 0;
	$scope.pedidos = []; 

	$scope.calculaTotal = function(){
		angular.forEach($scope.pedidos, function (pedido) {
			var precoPedido = pedido.item.preco * pedido.quantidade || 0;
			$scope.valorTotal += precoPedido;
		});	
	};

	$scope.carregaPedidos = function(){
		$http.get("http://www.agilecode.com.br/pedidos.php").success(
			function(data, code){
				angular.forEach(data, function (item) {
					$scope.pedidos.push(angular.fromJson(item));
				});
				$scope.calculaTotal();
			}
		);
	}
	$scope.carregaPedidos();

});