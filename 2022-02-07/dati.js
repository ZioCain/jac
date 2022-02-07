var dati = localStorage.getItem("dati");

dati = JSON.parse(dati);

function EliminaDaDB(elem){
	return new Promise(
		(resolve, reject)=>{
			// cerco l'indice dell'elemento
			const indice = dati.findIndex((x)=>x.id == elem.id);
			// se non trovo l'elemento, termino l'esecuzione
			if(indice === -1){
				reject();
				return;
			}
			// rimuovo elemento dall'array
			dati.splice(indice, 1);
			// aggiorno localStorage
			SalvaLS();

			// termino promise
			resolve();
		}
	);
}

function SalvaLS(){
	localStorage.setItem("dati", JSON.stringify(dati));
}

function InserisciInDB(frase){
	var elem = {
		id: dati[dati.length-1].id +1, // ultimo ID della lista +1
		frase: frase
	};
	return new Promise(
		(resolve, reject) => {
			dati.push(elem);
			SalvaLS();
			resolve(elem);
		}
	)
}

function AggiornaInDB(frase, id){
	return new Promise(
		(resolve, reject)=>{
			// cerco indice dell'elemento da modificare
			const indice = dati.findIndex((x)=>x.id == id);
			// se non lo trovo reject / stop
			if(indice === -1){
				reject();
				return;
			}
			// modifico i dati
			dati[indice].frase = frase;
			// salvo su LS
			SalvaLS();
			// ritorno il dato modificato
			resolve(dati[indice]);
		}
	);
}