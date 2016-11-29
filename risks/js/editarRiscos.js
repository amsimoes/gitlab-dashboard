"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main() {
	var arrrayRiscos = JSON.parse(localStorage.getItem("riscos"));
	var risco = localStorage.getItem("risco");
	for (var i = 0; i < arrrayRiscos.length; i+=4) {
		if(arrrayRiscos[i] == risco){
			document.getElementById("DescriçãoTexto").value = arrrayRiscos[i];
			document.getElementById("riscoDeadline").value = arrrayRiscos[i+1];
			document.getElementById(arrrayRiscos[i+2]).checked = true;
			document.getElementById(arrrayRiscos[i+3]).checked = true;
		}				
	}
	
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

	document.getElementById("riscoDeadline").addEventListener('change', alteraDeadline);

	document.getElementById("Baixo").addEventListener("change",alteraImpacto);
	document.getElementById("Médio").addEventListener("change",alteraImpacto);
	document.getElementById("Alto").addEventListener("change",alteraImpacto);

	document.getElementById("Baixa").addEventListener("change",alteraProbabilidade);
	document.getElementById("Média").addEventListener("change",alteraProbabilidade);
	document.getElementById("Alta").addEventListener("change",alteraProbabilidade);

	document.getElementById("DescriçãoTexto").addEventListener("focus",alteraDescricao);

	document.getElementById("guardar").addEventListener("click",guardar);
	document.getElementById("remover").addEventListener("click",confirmacao);
}

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


//Guardar a editação
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
		var arrayRiscos = [];
				
		arrayRiscos = JSON.parse(localStorage.getItem("riscos"));

		for (var i = 0; i < arrayRiscos.length; i+=4) {
			if(arrayRiscos[i] == localStorage.getItem("risco")){
				arrayRiscos[i] = descricaoValor;
				arrayRiscos[i+1] = deadlineValor;
				arrayRiscos[i+2] = impactoValor;
				arrayRiscos[i+3] = probabilidadeValor;
			}
		}
				
		localStorage.setItem("riscos", JSON.stringify(arrayRiscos));

		document.getElementById("editar").style.display = "none";
		document.getElementById("editado").style.display = "block";
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

function confirmacao(ev){
	document.getElementById("mensagem").innerHTML = "Are you sure?";
    document.getElementById("removido").style.display = 'block';

    document.getElementById("Sim").addEventListener("click",removerRisco);
	document.getElementById("Não").addEventListener("click",removerRisco);
}


function removerRisco(ev) {
	if (ev.target.id == "Sim") {
		var arrayRiscos = JSON.parse(localStorage.getItem("riscos"));

		/*var indice = document.getElementById("selecionarRiscos").selectedIndex;

		var selecionado = document.getElementsByTagName("option")[indice].value;*/

		var selecionado = document.getElementById("DescriçãoTexto").value;

		var arrayRiscosAux = [];

		for (var i = 0; i < arrayRiscos.length; i+=4) {
			if(arrayRiscos[i] != selecionado){
				arrayRiscosAux.push(arrayRiscos[i]);
				arrayRiscosAux.push(arrayRiscos[i + 1]);
				arrayRiscosAux.push(arrayRiscos[i + 2]);
				arrayRiscosAux.push(arrayRiscos[i + 3]);
			}
		}
		localStorage.setItem("riscos", JSON.stringify(arrayRiscosAux));
	}
    document.getElementById("removido").style.display = 'none';
    window.location = "visualizarRiscos.html";
}