var output = document.getElementById('output');

// op1 = valore1, op2 = valore2, operator = operazione da applicare
var op1 = 0, op2 = 0, operator = '+';
// fase di inserimento
// 1 - primo valore
// 2 - secondo valore
var which = 1;

// esegue effettivamente il calcolo
function calc(){
    switch(operator){
        case '+': output.value = +op1 + op2; break;
        case '-': output.value = +op1 - op2; break;
        case '*': output.value = +op1 * op2; break;
        case '/':
            // se il secondo valore è 0, evita la divisione e mostra "impossibile"
            if(op2 == 0)
                output.value = "IMPOSSIBILE";
            else
                output.value = +op1 / op2;
            break;
    }
    // azzera i valori in modo da essere pronto per il prossimo calcolo
    op1 = 0;
    op2 = 0;
    // riporta lo stato del sistema all'inserimento del primo valore
    which = 1;
    removeOpSelect();
}

// aggiunge il numero selezionato al valore che si sta inserendo e lo mostra
function add(num){
    if(which == 1){
        op1 *= 10;
        op1 += num;
        output.value = op1;
    }else{
        op2 *= 10;
        op2 += num;
        output.value = op2;
    }
}

// scegli operatore come stringa da 'op'
// obj = l'oggetto che ha chiamato questo evento (sender)
function pickOperator(op, obj){
    // se è già stato scelto l'operatore, non proseguire
    if(which == 2) return;
    removeOpSelect();
    // se viene passato l'oggetto corrente (sender) applica la classe
    if(obj) obj.classList.add('selected');
    // imposta l'operatore
    operator = op;
    // imposta il nuovo stato
    which = 2;
}

// rimuove la classe "selected" da tutti gli elementi che la hanno
function removeOpSelect(){
    // seleziona tutti gli elementi con classe ".selected"
    document.querySelectorAll('.selected')
    // per ogni elemento
    .forEach((element)=>{
        // rimuovi la classe
        element.classList.remove('selected');
    });
}