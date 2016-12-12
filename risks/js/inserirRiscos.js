"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function configurate() {
	var typeRisk = localStorage.getItem("typeRisk");
	if(typeRisk != null){
		switch (typeRisk){
			case "BaixaBaixo":
				document.getElementById("Baixo").checked = true;
				document.getElementById("Baixa").checked = true;
				break;
			case "MédiaBaixo":
				document.getElementById("Baixo").checked = true;
				document.getElementById("Média").checked = true;
				break;
			case "AltaBaixo":
				document.getElementById("Baixo").checked = true;
				document.getElementById("Alta").checked = true;
				break;
			case "BaixaMédio":
				document.getElementById("Médio").checked = true;
				document.getElementById("Baixa").checked = true;
				break;
			case "MédiaMédio":
				document.getElementById("Médio").checked = true;
				document.getElementById("Média").checked = true;
				break;
			case "AltaMédio":
				document.getElementById("Médio").checked = true;
				document.getElementById("Alta").checked = true;
				break;
			case "BaixaAlto":
				document.getElementById("Alto").checked = true;
				document.getElementById("Baixa").checked = true;
				break;
			case "MédiaAlto":
				document.getElementById("Alto").checked = true;
				document.getElementById("Média").checked = true;
				break;
			case "AltaAlto":
				document.getElementById("Alto").checked = true;
				document.getElementById("Alta").checked = true;
				break;
		}
	}
}

function main() {
	configurate();

	var hoje = new Date();
	var dd = hoje.getDate()+1;
	var mm = hoje.getMonth()+1;
	var yyyy = hoje.getFullYear();
	 if(dd<10){
			dd='0'+dd
		} 
		if(mm<10){
			mm='0'+mm
		} 

	hoje = yyyy + '-' + mm + '-' + dd;
	document.getElementById("riscoDeadline").setAttribute("min", hoje);
	document.getElementById("riscoDeadline").value = hoje;

	//Colocar com a formatação inicial a cada alteração
	document.getElementById("DescriçãoTexto").addEventListener("focus",alteraDescricao);

	document.getElementById("riscoDeadline").addEventListener('change', alteraDeadline);

	document.getElementById("Baixo").addEventListener("change",alteraImpacto);
	document.getElementById("Médio").addEventListener("change",alteraImpacto);
	document.getElementById("Alto").addEventListener("change",alteraImpacto);

	document.getElementById("Baixa").addEventListener("change",alteraProbabilidade);
	document.getElementById("Média").addEventListener("change",alteraProbabilidade);
	document.getElementById("Alta").addEventListener("change",alteraProbabilidade);

	//Clicar guardar
	document.getElementById("guardar").addEventListener("click",guardar);
}

//Variável auxiliar para guardar a deadline atual
var auxiliar = {};
auxiliar.riscoDeadline = "";

function alteraDeadline(ev) {
	//Estilo inicial
	document.getElementById('Deadline').style.border = "none";	
	//Verificar se houve alteração na deadline
	if (this.value != auxiliar.riscoDeadline) {
		var deadlineInserida = new Date(document.getElementById("riscoDeadline").value);
		var dataAtual = new Date();
		//Verificar se a deadline inserida é superior à data atual
		if(dataAtual > deadlineInserida)
		{
			this.style.borderColor = "red";
		}
		else{
			this.style.borderColor = "#ddd";		
		}
		//Atualizar variável auxiliar com a deadline inserida
		auxiliar.riscoDeadline = this.value;
	}
}		

function ajustarTextArea(h) {
	h.style.height = "20px";
	h.style.height = (h.scrollHeight)+"px";
}

//Função para guardar o risco inserido
function guardar(ev) {
	var errorDescricao = false;
	var errorDeadline = false;
	var errorRadio = true;

	var descricao = document.getElementById("Descrição");
	var descricaoValor = document.getElementById("DescriçãoTexto").value;

	if (descricaoValor == "" || descricaoValor.trim().length == 0) {
		errorDescricao = true;
		descricao.style.border = "1px solid red";
	}

	var deadline = document.getElementById("Deadline");
	var deadlineValor = document.getElementById("riscoDeadline").value;
	if (deadlineValor == "") {
		errorDeadline = true;
		deadline.style.border = "1px solid red";
	}

	var radioButtons = document.getElementsByName('ImpactoRadio');

	for (var i = 0, length = radioButtons.length; i < length; i++) {
		if (radioButtons[i].checked) {
			errorRadio = false;
			var impactoValor = radioButtons[i].value;
			break;
		}
	}

	if (errorRadio) {
		document.getElementById('Impacto').style.border = "1px solid red";
	}

	var errorRadio2 = true;

	radioButtons = document.getElementsByName('ProbabilidadeRadio');

	for (var i = 0, length = radioButtons.length; i < length; i++) {
		if (radioButtons[i].checked) {
			errorRadio2 = false;
			var probabilidadeValor = radioButtons[i].value;
			break;
		}
	}

	if (errorRadio2) {
		document.getElementById('Probabilidade').style.border = "1px solid red";
	}

	if (errorDescricao == false && errorDeadline == false && errorRadio == false && errorRadio2 == false) {
		var arrayRiscos;
		
		arrayRiscos = JSON.parse(localStorage.getItem("riscos"));

		if(arrayRiscos == null){
			arrayRiscos = [];
		}

		arrayRiscos.push(descricaoValor);
		arrayRiscos.push(deadlineValor);
		arrayRiscos.push(impactoValor);
		arrayRiscos.push(probabilidadeValor);

    // POST HTTP PARA localhost:5000 

    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:5000/create_risk",
      data: JSON.stringify({descricao: descricaoValor, deadline: deadlineValor, impacto: impactoValor, probabilidade: probabilidadeValor}),
      success: function (data) {
        console.log(data.title);
        console.log(data.article);

      },
      dataType: "json"
    });

		localStorage.setItem("riscos", JSON.stringify(arrayRiscos));

		document.getElementById("inserir").style.display = "none";
		window.location = "visualizarRiscos.html";
	}
}

function alteraImpacto(ev) {
	document.getElementById('Impacto').style.border = "none";	
}

function alteraProbabilidade(ev) {
	document.getElementById('Probabilidade').style.border = "none";	
}

function alteraDescricao(ev) {
	document.getElementById('Descrição').style.border = "none";	
}
