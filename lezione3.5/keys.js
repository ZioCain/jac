// gestisce l'inserimento dei valori tramite tastiera
function handleKey(e){
    // e.key contiene il "nome" del tasto premuto
    switch(e.key){
        case '+': pickOperator('+', document.getElementById('plus')); break;
        case '-': pickOperator('-', document.getElementById('minus')); break;
        case '*': pickOperator('*', document.getElementById('times')); break;
        case '/': pickOperator('/', document.getElementById('divide')); break;

        case '0': add(0); break;
        case '1': add(1); break;
        case '2': add(2); break;
        case '3': add(3); break;
        case '4': add(4); break;
        case '5': add(5); break;
        case '6': add(6); break;
        case '7': add(7); break;
        case '8': add(8); break;
        case '9': add(9); break;

        case 'Enter': calc(); break;
    }
}