var current_row = 0;
var left_attempts = 6;
var tentativi = 0;

// genero numero casuale da indovinare
function generaNumero() {
    var num_to_guess = "";
    for (x = 0; x < 4; x++) {
        var n = Math.floor(Math.random () * 10);
        num_to_guess +=  n.toString();
    }
    return num_to_guess;
}

num_to_guess = generaNumero()

function moveFocus(currentIndex, event) {
    var currentInput = document.getElementsByClassName("input" + currentIndex)[current_row];
    var inputValue = currentInput.value;

    // Limita la lunghezza a 1
    inputValue = inputValue.slice(0, 1);
    currentInput.value = inputValue;

    // Controlla se l'input non è vuoto e se non è l'ultimo input
    if (event.target.value !== "" && currentIndex < 4) {
        var nextInput = document.getElementsByClassName("input" + (currentIndex + 1))[current_row];
        nextInput.focus(); // sposta il focus
    }
}

function checkInput() { // controlla se ci sono tutti e 4 input
    var number = ""
    for (x=1; x<5; x++){
        var currentInput = document.getElementsByClassName("input" + x)[current_row];
        if (currentInput.value.length === 0) {
            return false;
        }
        number += currentInput.value
        }
    return number;
}

function restartFunction() {
    current_row = 0;
    left_attempts = 6;
    tentativi = 0;

    document.getElementById('vittoria').style.display='none';
    document.getElementById('sconfitta').style.display='none';
    document.getElementsByTagName('main')[0].style.display='block';

    num_to_guess = generaNumero()

    for (i=0; i<6; i++) {
        document.getElementsByClassName("number_guess")[i].style.display = "none"; // nasconde tutte le righe
        for (y=1;y<5;y++) {
            document.getElementsByClassName('input' + y)[i].disabled = false; //riabilita gli input
            document.getElementsByClassName('input' + y)[i].value = ''; // cancella i numeri inseriti
            document.getElementsByClassName('input' + y)[i].style.color = 'black'; // resetta i colori
        }
    }

    document.getElementsByClassName("number_guess")[0].style.display = "flex"; // mostra la prima riga
    var nextInput = document.getElementsByClassName("input1")[0]; 
    nextInput.focus(); // sposta l'input sulla prima casella
}

document.body.addEventListener("keydown", function(event) {
    enterKey(event);
});

function enterKey(e){
    if (e.key === "Enter" ){ // ricevere gli input
        if (checkInput()) {  // verificare che siano stati inseriti 4 input

            // non puoi piu cambiare quelli precedenti
            for (y=1;y<5;y++) {
                document.getElementsByClassName('input' + y)[current_row].disabled = true;
                (document.getElementsByClassName('input' + y)[current_row]).style.backgroundColor = "white"
            }

            // controllo dei numeri
            var number_guessed = checkInput()
            for (x=0; x<4; x++) {
                if (num_to_guess.includes(number_guessed[x])) {
                    if (num_to_guess[x] === number_guessed[x]) { // se il numero e' giusto
                        (document.getElementsByClassName('input' + (x+1))[current_row]).style.color = "green";
                    } else { // se il numero e' solo compreso
                        (document.getElementsByClassName('input' + (x+1))[current_row]).style.color = "#fdcf00";
                    }
                } else { // se il numero non c'e
                    (document.getElementsByClassName('input' + (x+1))[current_row]).style.color = "red";

                }
            }

            left_attempts--;
            document.getElementById('lefts').innerHTML = left_attempts;

            tentativi++; // aumenta il conto dei tentativi usati

            if (number_guessed === num_to_guess) {
                document.getElementsByTagName('main')[0].style.display='none'
                document.getElementById('vittoria').style.display='flex'; // display della vittoria
                document.getElementById('punteggio').innerHTML = tentativi; // mostra i tentativi usati
            }

            if (current_row < 5) { // se ho altri tentativi
                current_row++;
                document.getElementsByClassName("number_guess")[current_row].style.display = "flex";

                // muovi il focus
                var nextInput = document.getElementsByClassName("input1")[current_row];
                nextInput.focus(); 
            } else {
                document.getElementsByTagName('main')[0].style.display='none'
                document.getElementById('sconfitta').style.display='flex';
            }
        }
    }
}