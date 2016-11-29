"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main() {
	var riscos = JSON.parse(localStorage.getItem("riscos"));
	var selecionarRiscos = document.getElementById("selecionarRiscos");

	if(riscos == null || riscos.length == 0){
		var texto = document.createElement('p');
		texto.innerHTML = "Não há riscos!";
		document.getElementById("removerRiscos").appendChild(texto);
	}
	else{
		document.getElementById("removerForm").style.display = "block";
		var idRisco = 1;
		for (var i = 0; i < riscos.length; i+=4) {
			var opcao = document.createElement('option');
			opcao.value = riscos[i];
			opcao.innerHTML = idRisco + ": " + riscos[i];
			idRisco++;
			selecionarRiscos.appendChild(opcao);
		}
	}

	document.getElementById("remover").addEventListener("click",confirmacao);
}

function confirmacao(ev){
	document.getElementById("mensagem").innerHTML = "De certeza que quer remover o risco?";
    document.getElementById("removido").style.display = 'block';

    document.getElementById("Sim").addEventListener("click",removerRisco);
	document.getElementById("Não").addEventListener("click",removerRisco);
}


function removerRisco(ev) {
	if (ev.target.id == "Sim") {
		var arrayRiscos = JSON.parse(localStorage.getItem("riscos"));

		var indice = document.getElementById("selecionarRiscos").selectedIndex;

		var selecionado = document.getElementsByTagName("option")[indice].value;

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
    location.reload();
}