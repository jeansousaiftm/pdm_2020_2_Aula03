var firebaseConfig = {
	apiKey: "AIzaSyCjcwd650-1S94Y7WMXlIYY8CcNj2Pdp6Y",
	authDomain: "pdm-2020-2-aula03.firebaseapp.com",
	databaseURL: "https://pdm-2020-2-aula03.firebaseio.com",
	projectId: "pdm-2020-2-aula03",
	storageBucket: "pdm-2020-2-aula03.appspot.com",
	messagingSenderId: "222320237027",
	appId: "1:222320237027:web:b398a7ab30ca3feb35a8d6"
};

firebase.initializeApp(firebaseConfig);

var tarefasDB = firebase.database().ref("tarefas");

function add() {
	
	if ($("#tarefa").val() != "") {
		var tarefa = { "nome": $("#tarefa").val(), "feito": false };
		tarefasDB.push(tarefa);
		$("#tarefa").val("");
		list();
	}
	
}

function list() {

	tarefasDB.once("value", function(tarefas) {
		
		var html = "";
		
		tarefas.forEach(function(tarefa) {
			html += createHTML(tarefa.key, tarefa.val());
		});
		
		$("#tarefas").html(html);
		
	});

}

function createHTML(id, tarefa) {
	
	var html = "";
	
	if (tarefa.feito) {
		html += "<li class='collection-item feito'>";
	} else {
		html += "<li class='collection-item'>";
	}
	
	html += "<div onclick='changeStatus(\"" + id + "\", this);'><span>" + tarefa.nome + "</span><a class='secondary-content' onclick='del(event, \"" + id + "\"); return false;'><i class='material-icons excluir'>delete</i></a></div></li>";
	
	return html;
	
}

function changeStatus(id, obj) {
	
	var feito = $(obj).parent("li").hasClass("feito");
	
	tarefasDB.child(id).update({
		"feito": !feito
	});
	
	list();
	
}

function del(evt, id) {
	evt.stopPropagation();
	tarefasDB.child(id).remove();
	list();
}