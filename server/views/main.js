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

function appendColumn(container, data){
    const td = document.createElement("td");
    td.innerHTML = data;
    // aggiunta stile / classi / ...
    container.appendChild(td);
}

function InterpretDate(dateString){
    let parts = dateString.split('/');
    return new Date(+parts[0], parts[1]+1, +parts[2]);
}

function CaricaDati(){
    // svuota tabella
    // container.innerHTML="";
    while(container.firstChild) container.removeChild(container.firstChild);

    for(var k=0; k<dati.length; ++k){
        const tr = document.createElement("tr");
        for(var prop in dati[k]){
            let item = dati[k][prop];
            if(prop === 'nascita'){
                // appende colonna con data in formato francese (con 0 iniziali)
                appendColumn(tr, new Date(item.datadinascita).toLocaleDateString('fr-FR'));
                // appende colonna con luogo di nascita
                appendColumn(tr, item.luogo);
            }else
                appendColumn(tr, item);
        }
        const azioni = document.createElement("td");
        azioni.classList.add("btn-group")
        
        const modifica = document.createElement("button");
        modifica.innerHTML="MODIFICA";
        modifica.classList.add("btn","btn-info");
        modifica.addEventListener('click', OnModifica);

        const elimina = document.createElement("button");
        elimina.innerHTML="ELIMINA";
        elimina.classList.add("btn","btn-danger");
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

    fetch('/studenti/deletestudente/'+id, {
        method: 'DELETE'
    })
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
        username: idModifica,
        nome: modal.querySelector("[name='nome']").value,
        cognome: modal.querySelector("[name='cognome']").value,
        data: modal.querySelector("[name='data']").value,
        luogo: modal.querySelector("[name='luogo']").value,
    };
    dati = dati.map(
        x => x.username == idModifica ? persona : x
    );

    fetch('/studenti/updatestudente/'+idModifica, {
        method: 'PUT',
        body: ObjectToURL(persona),
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    CaricaDati();
    idModifica = null;

    // chiudere modale
    Annulla();
}
function OnSalvaNuovo(){
    const modal = document.querySelector("#modal-nuovo");
    const persona = {
        username: parseInt(Math.random()*100)+dati.length,
        nome: modal.querySelector("[name='nome']").value,
        cognome: modal.querySelector("[name='cognome']").value,
        data: modal.querySelector("[name='data']").value,
        luogo: modal.querySelector("[name='luogo']").value,
    };
    dati.push(persona);

    fetch('/studenti/addstudente', {
        method: 'POST',
        body: ObjectToURL(persona),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(async res=>{
        if(res.status == 200)
            return res.text()
        else{
            error = await res.text()
            throw Error(error);
        }
    })
    .catch(err=>alert(err));

    CaricaDati();
    Annulla();
}

function ObjectToURL(object){
    let parts = [];
    for(var part in object){
        parts.push(part+'='+object[part]);
    }
    return parts.join('&');
}