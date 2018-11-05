angular.module('appTodo')
.controller('TodoController', TodoController);


function TodoController($scope, $resource, $mdDialog){
    

	$scope.vm = {};
	let vm = $scope.vm;

	let todoApi = $resource('https://localhost:5001/api/todo/:id', {id: '@id'}, {
    	update: {
    		method: 'PUT'
    	}
  	})

	vm.todos = [
		{done: true, todo: 'Apresentar app em angular'},
		{done: true, todo: 'Apresentar conceito API e FRONT separados'},
		{done: false, todo: 'Construir app em angular'},
		{done: false, todo: 'Integrar app com API'},
		{done: false, todo: 'Implementar CRUD com angular e API'},
	]

	function init(){		
		carregaTodos();
	}
	init()

	vm.adicionaTarefa = adicionaTarefa;
	vm.atualizaTodo = atualizaTodo;

	function carregaTodos(){
		vm.dsLista = new todoApi();
		vm.dsLista.$get().then(function(resposta){
			vm.dsLista.data = resposta.dados;
		})	
	}

	function adicionaTarefa(){
		ds = new todoApi();
		ds.name = vm.todoName;
		ds.isComplete = false;

		ds.$save().then(function(resposta){
			vm.todoName = '';
			carregaTodos()
		})

	}

	function atualizaTodo(todo){
		ds = new todoApi();
		ds.name = todo.name;
		ds.isComplete = todo.isComplete;
		ds.id = todo.id;

		ds.$update().then(function(resposta){			
			//carregaTodos()
		})
	}

	/// Carrega todos os cliente ao inicializar
	//vm.carregaClientes();

	/*vm.excluir = function(ev,pessoa){
		
	    let confirmacao = $mdDialog.confirm()
	          .title('Aguardando confirmação')
	          .textContent('Confirma a exclusão da pessa ' + pessoa.nome)
	          .ariaLabel('Msg interna do botao')
	          .targetEvent(ev)
	          .ok('Sim')
	          .cancel('Não');

	    $mdDialog.show(confirmacao).then(function() {
	      	vm.excluiCliente(pessoa.id)
	    });
	}*/
	

	/*vm.excluiCliente = function(IdCliente){
		let dsCliente = new clienteApi();

		dsCliente.id = IdCliente;

		let sucesso = function(resposta){			
			if (resposta.sucesso) {
				toastr.info("SUCESSO","Cliente excluído com êxito :)");				
				vm.carregaClientes();
			}
		}

		let erro = function(resposta){
			console.log(resposta)	
		}

		dsCliente.$delete({id: IdCliente},sucesso,erro);
	}*/

	/*vm.editarCliente = function(pessoa){
		if (!pessoa.id) {
			toastr.info('Pessoa não cadastrada')
			return;
		}

		vm.dataset = angular.copy(pessoa);
	}

	vm.salvaDados = function(){
		let dsCliente = new clienteApi();

		dsCliente.cliente = {			
			nome   : vm.dataset.nome,
			idade  : vm.dataset.idade
		}	

		let sucesso = function(resposta){
			console.log(resposta)
			if (resposta.sucesso) {				

				if (vm.dataset.id) {
					toastr.info("Cliente atualizado com êxito","SUCESSO")
				} else {
					toastr.success("Cliente incluído com êxito :)","SUCESSO")	
				}

				vm.limpaDados()		
				vm.carregaClientes()			
			}
		}

		let erro = function(resposta){
			console.log(resposta)	
		}

		if (vm.dataset.id) {
			dsCliente.id = vm.dataset.id;
			dsCliente.$update().then(sucesso,erro)
		} else {
		 	dsCliente.$save().then(sucesso,erro) 	
		}
	}*/	

	/*vm.limpaDados = function(){
		vm.dataset = {}				
		vm.formPessoa.$setUntouched();
	}*/	

}




