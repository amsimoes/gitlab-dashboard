"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

function main() {
	var BaixaBaixo = document.getElementById("BaixaBaixo");
	var MediaBaixo = document.getElementById("MédiaBaixo");
	var AltaBaixo = document.getElementById("AltaBaixo");
	var BaixaMedio = document.getElementById("BaixaMédio");
	var MediaMedio = document.getElementById("MédiaMédio");
	var AltaMedio = document.getElementById("AltaMédio");
	var BaixaAlto = document.getElementById("BaixaAlto");
	var MediaAlto = document.getElementById("MédiaAlto");
	var AltaAlto = document.getElementById("AltaAlto");

	var content = document.getElementsByClassName("content");

	BaixaBaixo.addEventListener("click",insert);
	MediaBaixo.addEventListener("click",insert);
	AltaBaixo.addEventListener("click",insert);
	BaixaMedio.addEventListener("click",insert);
	MediaMedio.addEventListener("click",insert);
	AltaMedio.addEventListener("click",insert);
	BaixaAlto.addEventListener("click",insert);
	MediaAlto.addEventListener("click",insert);
	AltaAlto.addEventListener("click",insert);

	var riscos = JSON.parse(localStorage.getItem("riscos"));
	var select = document.getElementById("sel1");
	var idRiscos = 1;
	var aux;
	var opt;
	var showRiskText = document.getElementById("box");
	if(riscos != null){
		for (var i = 2; i < riscos.length; i+=4) {
			opt = document.createElement('A');
			opt.id = riscos[i-2];
			opt.innerHTML = idRiscos + ": " + riscos[i-2] + "<br>";
			opt.href = "editarRiscos.html";
			opt.addEventListener("mouseover",showRiskEvent);
			opt.addEventListener("click",editRiskEvent);
			function showRiskEvent(ev) {
				showRisk(riscos, ev.target.id);
			}
			function editRiskEvent(ev) {
				editRisk(ev.target.id);
			}
			opt.addEventListener("mouseout",hideRisk);
			if(riscos[i] == "Baixo"){
				if(riscos[i+1] == "Baixa"){
					aux = BaixaBaixo;
					aux.className = "";
					aux.className = "green";
					
					content[6].appendChild(opt);
				}
				else if(riscos[i+1] == "Média"){
					aux = MediaBaixo;
					aux.className = "";
					aux.className = "green";

					content[3].appendChild(opt);
				}
				else if(riscos[i+1] == "Alta"){
					aux = AltaBaixo;
					aux.className = "";
					aux.className = "yellow";
					 
					content[0].appendChild(opt);
				}
			}
			else if(riscos[i] == "Médio"){
				if(riscos[i+1] == "Baixa"){
					aux = BaixaMedio;
					aux.className = "";
					aux.className = "green";
									
					content[7].appendChild(opt);
				}
				else if(riscos[i+1] == "Média"){
					aux = MediaMedio;
					aux.className = "";
					aux.className = "yellow";
					
					content[4].appendChild(opt);
				}
				else if(riscos[i+1] == "Alta"){
					aux = AltaMedio;
					aux.className = "";
					aux.className = "red";
					
					content[1].appendChild(opt);
				}	
			}
			else if(riscos[i] == "Alto"){
				if(riscos[i+1] == "Baixa"){
					aux = BaixaAlto;
					aux.className = "";
					aux.className = "yellow";
					
					content[8].appendChild(opt);
				}
				else if(riscos[i+1] == "Média"){
					aux = MediaAlto;
					aux.className = "";
					aux.className = "red";
					
					content[5].appendChild(opt);
				}
				else if(riscos[i+1] == "Alta"){
					aux = AltaAlto;
					aux.className = "";
					aux.className = "red";
									
					content[2].appendChild(opt);
				}
			}
			idRiscos++;
		}
	}
	
}

function insert(ev) {
	localStorage.setItem("typeRisk",ev.currentTarget.id);
	window.location = "inserirRiscos.html";
}

function editRisk(risco) {
	localStorage.setItem("risco",risco);
}

function showRisk(riscos,risco) {
	var showRiskText = document.getElementById("box");
	for (var i = 0; i < riscos.length; i+=4) {
		if(riscos[i] == risco){
			showRiskText.innerHTML = "Risk: " + riscos[i] + "<br>Deadline: " + riscos[i+1];
			break;
		}
	}
	
	showRiskText.style.display = "block";
}

function hideRisk(ev) {
	console.log("sai");
	document.getElementById("box").style.display = "none";
}