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

	var btnEdit = document.createElement("button");
	btnEdit.innerText = "Modifica";
	td.appendChild(btnEdit);
	btnEdit.onclick = function(){Modifica(elem)};
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

// funzione per la modifica di una frase
function Modifica(elem){
	var frase = prompt("Modifica la frase", elem.frase);
	if(frase){
		AggiornaInDB(frase, elem.id)
		.then((elem)=>{
			// aggiorna riga in HTML
			// prendo la riga di riferimento
			var row = document.getElementById(elem.id);
			// modifico la seconda cella, che contiene la frase stessa
			row.children[1].innerText = elem.frase;
		})
		.catch(()=>{
			alert("Impossibile aggiornare la frase");
		});
	}
}