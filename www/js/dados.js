var tarefas = [];

function nextID() {
	
	var id = 1;
	
	tarefas.forEach(function(tarefa, index) {
		if (tarefa.id >= id) id = tarefa.id + 1;
	});
	
	return id;	
}

function add() {
	
	if ($("#tarefa").val() != "") {
		var tarefa = { "id": nextID(), "nome": $("#tarefa").val(), "feito": false };
		tarefas.push(tarefa);
		$("#tarefa").val("");
		list();
	}
	
}

function list() {
	
	var html = "";
	
	tarefas.forEach(function(tarefa, index) {
		html += createHTML(tarefa);
	});
	
	$("#tarefas").html(html);
	
}

function createHTML(tarefa) {
	
	var html = "";
	
	if (tarefa.feito) {
		html += "<li class='collection-item feito'>";
	} else {
		html += "<li class='collection-item'>";
	}
	
	html += "<div onclick='changeStatus(" + tarefa.id + ")'><span>" + tarefa.nome + "</span><a class='secondary-content' onclick='del(" + tarefa.id + ")'><i class='material-icons excluir'>delete</i></a></div></li>";
	
	return html;
	
}

function changeStatus(id) {
	
	tarefas.forEach(function(tarefa, index) {
		if (tarefa.id == id) tarefa.feito = !tarefa.feito;
	});
	
	
	list();
	
}

function del(id) {
	
	console.log(id);
	
	tarefas.forEach(function(tarefa, index) {
		if (tarefa.id == id) tarefas.splice(index, 1);
	});
	
	
	list();
	
}