const corpo = document.getElementById("corpo-tabella");

function Elimina(elem){
	// cerco l'indice dell'elemento
	const indice = dati.findIndex((x)=>x.id == elem.id);
	// se non trovo l'elemento, termino l'esecuzione
	if(indice === -1) return;
	// rimuovo elemento dall'array
	dati.splice(indice, 1);

	// rimuovo elemento dall'HTML
	document.getElementById(elem.id).remove();
}

function AggiungiAzioni(tr, elem){
	var td = document.createElement("td");
	var btn = document.createElement("button");

	btn.innerText = "Cancella";
	tr.appendChild(td);
	td.appendChild(btn);

	btn.onclick = function(){Elimina(elem)};
}

function AggiungiARiga(tr, elem){
	var td = document.createElement("td");
	tr.appendChild(td);
	td.innerText = elem;
}

function AggiungiATabella(elem){
	var tr = document.createElement("tr");
	corpo.appendChild(tr);
	tr.id = elem.id;
	for(var key in elem){
		AggiungiARiga(tr, elem[key]);
	}

	AggiungiAzioni(tr, elem);
}

dati.forEach( AggiungiATabella );