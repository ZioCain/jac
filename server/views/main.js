// contenitore globale dei dati degli studenti
let dati = [];

function fetchDati(){
    fetch('/studenti')
    .then(res=>res.json())
    .then(json=>{
        dati = json;
        CaricaDati();
    })
    .catch(err=>alert(err));
}
fetchDati();

const container = document.querySelector("tbody");

let idModifica = null;

function CaricaDati(){
    // svuota tabella
    // container.innerHTML="";
    while(container.firstChild) container.removeChild(container.firstChild);

    for(var k=0; k<dati.length; ++k){
        const tr = document.createElement("tr");
        for(var prop in dati[k]){
            if(prop === 'nascita') continue;
            const td = document.createElement("td");
            td.innerHTML = dati[k][prop];
            // aggiunta stile / classi / ...
            tr.appendChild(td);
        }
        const azioni = document.createElement("td");
        
        const modifica = document.createElement("button");
        modifica.innerHTML="MODIFICA";
        modifica.addEventListener('click', OnModifica);

        const elimina = document.createElement("button");
        elimina.innerHTML="ELIMINA";
        elimina.addEventListener('click', OnElimina);
        
        azioni.appendChild(modifica);
        azioni.appendChild(elimina);

        tr.appendChild(azioni);

        container.appendChild(tr);
    }
}

function OnNuovo(){
    document.querySelector("#modal-nuovo").style.display = "flex";
    document.querySelector(".overlay").style.display = "block"; // mostra overlay
}
function OnModifica(event){
    const row = event.target.parentNode.parentNode;
    // prima colonna
    const id = row.querySelector("td").innerHTML;
    idModifica = id;
    const persona = dati.find(x => x.username == id);
    if(persona==null) return;

    const modal = document.querySelector("#modal-modifica");
    modal.querySelector("[name='nome']").value = persona.nome;
    modal.querySelector("[name='cognome']").value = persona.cognome;
    modal.style.display = "flex"; // mostra modale
    document.querySelector(".overlay").style.display = "block"; // mostra overlay
}
function OnElimina(event){
    const row = event.target.parentNode.parentNode;
    const id = row.querySelector("td").innerHTML;
    // rimuovo la riga dall'HTML
    container.removeChild(row);
    // rimuovo elemento in base all'ID
    dati = dati.filter(x => x.username != id);
}
// chiude la modale
function Annulla(){
    // nascondi tutte le modali e overlay
    document.querySelectorAll(".modal, .overlay")
    .forEach(modal => modal.style.display = "none");
}
function ChiediChiudiOverlay(){
    if(confirm("Vuoi annullare le modifiche?"))
        Annulla()
}
// salva dati e ricarica la tabella
function OnSalva(){
    const modal = document.querySelector("#modal-modifica");
    const persona = {
        n: idModifica,
        nome: modal.querySelector("[name='nome']").value,
        cognome: modal.querySelector("[name='cognome']").value
    };
    dati = dati.map(
        x => x.username == idModifica ? persona : x
    );

    CaricaDati();
    idModifica = null;

    // chiudere modale
    Annulla();
}
function OnSalvaNuovo(){
    const modal = document.querySelector("#modal-nuovo");
    const persona = {
        n: parseInt(Math.random()*100)+dati.length,
        nome: modal.querySelector("[name='nome']").value,
        cognome: modal.querySelector("[name='cognome']").value
    };
    dati.push(persona);
    CaricaDati();
    Annulla();
}