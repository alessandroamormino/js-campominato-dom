// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


// PSEUDOCODICE

/*
Base Game:

x seleziono il bottone dal DOM e lo memorizzo in una variabile
x seleziono il contenutore della mia griglia dal DOM e lo memorizzo in una variabile
- AL CLICK del bottone: 
    x Creo 100 <div>
    x Assegno una classe .square ad ogni elemento creato
    x Assegno ad ogni <div> un numero progressivo da 1 a 100
    x Appendo ogni <div> al contenitore letto dal DOM
    
    - AL CLICK della cella: 
        x assegno all'elemento una classe che la colorerà di azzurro 
        x stampo in console il numero della cella cliccata

Bonus:
x seleziono il <select> dal DOM e lo memorizzo in una variabile
x seleziono il valore del select e memorizzo la modalità scelta in una variabile
x creo una variabile con il numero totale delle caselle da creare
x creo variabile numero caselle per riga

? SE ha scelto la modalità 'hard'
    °V1: assegno alla variabile il numero delle caselle con il valore di 49;
    °V2: assegno alla variabile numero caselle per riga il valore di 7;
?: ALTRIMENTI SE ha scelto la modalità 'medium'
    °V1: assegno alla variabile il numero delle caselle con il valore di 81;
    °V2: assegno alla variabile numero caselle per riga il valore di 9;
: ALTRIMENTI (ha scelto modalità 'easy' oppure non ha scelto niente)
    °F1: assegno alla variabile il numero delle caselle con il valore di 100;
    °F2: assegno alla variabile numero caselle per riga il valore di 10;

x uso questa variabile nel ciclo che uso per generare le caselle per determinare il numero
x setto la width del contenitore della griglia con la formula calc(50px * numero caselle per riga);

*/


// CODE


// - seleziono il bottone dal DOM e lo memorizzo in una variabile
const btnGenerateEl = document.getElementById('generate-grid');

// - seleziono il contenutore della mia griglia dal DOM e lo memorizzo in una variabile
const gridContainerEl = document.getElementById('grid-container');

// - seleziono il <select> dal DOM e lo memorizzo in una variabile
const selectModeEl = document.getElementById('mode');


// - AL CLICK del bottone: 

btnGenerateEl.addEventListener('click', function(){
    // inizializzo un contatore per il mio ciclo
    let i = 0;

    // - seleziono il valore del select e memorizzo la modalità scelta in una variabile
    let mode = selectModeEl.value;

    // - dichiaro una variabile con il numero totale delle caselle da creare
    let caselleTot;
    
    // - dichiaro variabile numero caselle per riga
    let casellePerRiga;

    // Bonus: Seleziono la modalità
    if(mode=='hard'){
        // ? SE ha scelto la modalità 'hard'
        // °V1: assegno alla variabile il numero delle caselle con il valore di 49;
        caselleTot = 49;
        // °V2: assegno alla variabile numero caselle per riga il valore di 7;
        casellePerRiga = 7;
    } else if(mode=='medium'){
        // ?: ALTRIMENTI SE ha scelto la modalità 'medium'
        // °V1: assegno alla variabile il numero delle caselle con il valore di 81;
        caselleTot = 81;
        // °V2: assegno alla variabile numero caselle per riga il valore di 9;
        casellePerRiga = 9;
    } else{
        // : ALTRIMENTI (ha scelto modalità 'easy' oppure non ha scelto niente)
        // °F1: assegno alla variabile il numero delle caselle con il valore di 100;
        caselleTot = 100;
        // °F2: assegno alla variabile numero caselle per riga il valore di 10;
        casellePerRiga = 10;
    }
    
    // - setto la width del contenitore della griglia con la formula calc(50px * numero caselle per riga);
    gridContainerEl.style.width = `calc(80px * ${casellePerRiga})`;

    while(i<caselleTot){
        // memorizzo una variabile contatore
        let count = i;

        let cella = createSquare(i+1);
        
        // - AL CLICK della cella:
        cella.addEventListener('click', function(){
            // - assegno all'elemento una classe che la colorerà di azzurro 
            cella.classList.toggle('light-blue');

            // - stampo in console il numero della cella cliccata
            console.log(`Hai cliccato la cella n. ${count+1}`);
        });


        // - Appendo ogni <div> al contenitore letto dal DOM
        gridContainerEl.append(cella);

        // aggiorno il contatore per uscire dal loop
        i++;
    }
});





// FUNCTIONS

/**
 * Crea un elemento div, gli assegna una classe 'square' e ci scrive dentro un testo passato come parametro
 * @param {any} text
 * @returns {HTMLDivElement}
 */
function createSquare(text){
    // creo un elemento div
    let newDivEl = document.createElement('div');
    // gli assegno una classe square
    newDivEl.classList.add('square');
    // gli assegno un testo
    newDivEl.innerText = text;

    return newDivEl;
}
