const corpo = document.getElementById("corpo-tabella");

function Elimina(elem){
	if(confirm("Vuoi davvero eliminare la frase?"))
		EliminaDaDB(elem)
		.then(()=>{
			// rimuovo elemento dall'HTML
			document.getElementById(elem.id).remove();
		})
		.catch(()=>{
			alert("Impossibile eliminare la frase");
		});
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

// inserimento
function Inserisci(){
	var frase = prompt("Inserisci nuova frase");
	if(frase){
		InserisciInDB(frase)
		.then((elem)=>{
			AggiungiATabella(elem);
		});
	}
}