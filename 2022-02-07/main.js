var dati = [
    "<b>asdf</b>asfd",
    "asdfasdf",
    "valore 3",
    "valore 4",
    "frase 5",
	"asdfasdf",
	"opgofddhjdf"
];

const corpo = document.getElementById("corpo-tabella");

function AggiungiATabella(elem){
	var tr = document.createElement("tr");
	var td = document.createElement("td");

	corpo.appendChild(tr);
	tr.appendChild(td);

	td.innerText = elem;
}

dati.forEach( AggiungiATabella );