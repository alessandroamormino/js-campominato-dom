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


CONSEGNA DOM: 

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

SUPERBONUS: 
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.


PSEUDOCODE: 

- AL CLICK DELLA CELLA
    x creo un array di 16 numeri casuali diversi, queste saranno le posizioni delle bombe nella griglia.
    x creo una variabile per il punteggio
    ? SE il numero della cella è presente nella lista dei numeri generati
        ° V1: Assegno alla cella cliccata una classe "bomb" che la colora di rosso
        ° V2: Termina la partita
        ° V3: Stampo il conteggio
    : ALTRIMENTI 
        °F1: la cella cliccata si colora di azzurro
        °F2: Aumento il punteggio

    ? SE il giocatore raggiunge il numero massimo di celle cliccabili senza bombe
        ° V1: Termina la partita 
        ° V2: Stampo il punteggio 

*/


// CODE


// - seleziono il bottone dal DOM e lo memorizzo in una variabile
const btnGenerateEl = document.getElementById('generate-grid');

// - seleziono il contenutore della mia griglia dal DOM e lo memorizzo in una variabile
const gridContainerEl = document.getElementById('grid-container');

// - seleziono il <select> dal DOM e lo memorizzo in una variabile
const selectModeEl = document.getElementById('mode');

// - creo un array di 16 numeri casuali diversi, queste saranno le posizioni delle bombe nella griglia
let bombs = [];

// creo una variabile per il punteggio
let points = 0;

// Creo variabile per capire se ho terminato la partita
let isFinished = false;

// Creo una variabile per capire se ho perso
let isLost = false;

// Leggo il layer invisibile
const invisibleLayerEl = document.getElementById('invisible-layer');

// Leggo il bottone per la nuova partita
const btnNewGameEl = document.getElementById('new-game')

// Leggo il contenitore del messaggio per stampare il punteggio finale
let messageEl = document.getElementById('message');

// Creo un array contenente le celle selezionate durante la partita
const selectedCells = [];

// Creo un array con tutte le celle create
const allCells = [];




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

    // Azzero il punteggio
    points = 0;


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


    // Genero le bombe
    bombs = createBombs(bombs, caselleTot);


    // - setto la width del contenitore della griglia con la formula calc(50px * numero caselle per riga);
    gridContainerEl.style.width = `calc(80px * ${casellePerRiga})`;

    invisibleLayerEl.style.width = `calc(80px * ${casellePerRiga})`;
    invisibleLayerEl.style.height = `calc(80px * ${casellePerRiga})`;

    while(i<caselleTot){
        // memorizzo una variabile contatore
        let currentCell = i + 1;

        let cella = createSquare(i+1);
        allCells.push(cella);

        
        // - AL CLICK della cella:
        cella.addEventListener('click', function(){

            // ? SE il numero della cella è presente nella lista dei numeri generati (bombe)
            if(bombs.includes(currentCell)){
                // ° V1: Assegno alla cella cliccata una classe "bomb" che la colora di rosso
                returnCell(cella).classList.add('bomb');

                // ° V2: Termina la partita
                isFinished = true;
                isLost = true;

            } else {
                if(!selectedCells.includes(currentCell)){
                    selectedCells.push(currentCell);
    
                    // - assegno all'elemento una classe che la colorerà di azzurro 
                    returnCell(cella).classList.add('light-blue');

                    // incremento i punti
                    points++;
    
                    // Controllo se ho cliccato tutte le celle senza bombe
                    if(selectedCells.length==caselleTot-bombs.length){
                        // Stampo che ho vinto + punteggio
                        isFinished = true;
                    }
                } else {
                    messageEl.innerText = `Hai già cliccato la cella ${currentCell}`;
                }

            }

            // Controllo se la partita è terminata
            if (isFinished){
                gameOver(invisibleLayerEl, isLost, points, btnNewGameEl, messageEl);
                // Superbonus: mostro le celle che avevano le bombe
                showBombs(allCells, bombs);
            }

        });    


        // - Appendo ogni <div> al contenitore letto dal DOM
        gridContainerEl.append(cella);

        // aggiorno il contatore per uscire dal loop
        i++;
    }

});

// Nuova partita
btnNewGameEl.addEventListener('click', function(){
    document.location.reload();
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

// NUMERO CASUALE DA min A max
/**
 * Genera un numero random da 1 a 5
 * @returns {number}
 */
function randomNumber(min, max){
    return Math.floor(Math.random()* (max - min + 1) + min);
}

// CREATE BOMBS

/**
 * Popola un array di 16 elementi con numeri casuali diversi tra loro
 * @param {any} myArray
 * @param {any} numOfCell
 * @returns {any} myArray
 */
function createBombs(myArray, numOfCell){
    // Popolo l'array con le 16 bombe
    let countBombs = 0;

    while(myArray.length < 16){
        let newBomb = randomNumber(1, numOfCell);

        if(!myArray.includes(newBomb)){
            myArray.push(newBomb);
        }

        countBombs++;
    }

    return myArray;
}



/**
 * Mostra nel DOM il layer invisibile che impedisce di cliccare altre celle, mostra il bottone di nuova partita e stampa il messaggio se hai vinto o perso
 * @param {HTMLElement} layer
 * @param {boolean} isLost
 * @param {number} points
 * @param {HTMLElement} btn
 * @param {HTMLElement} text
 * @returns {any}
 */
function gameOver(layer, isLost, points, btn, text){
    // Mostro nel DOM il mio layer invisibile che impedisca di cliccare altre celle
    layer.style.display = 'flex';

    // Mostro nel DOM il mio bottone per la nuova partita
    btn.style.display = 'block';

    // Stampo il messaggio con il punteggio
    if(isLost){
        text.innerText = `Hai perso, il tuo punteggio è ${points}`;
    }else{
        text.innerText = `Hai vinto, il tuo punteggio è ${points}`;
    }
}



/**
 * Aggiunge la classe bomb a tutte le celle che contengono le bombe
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {any}
 */
function showBombs(arr1, arr2){
    for(let i=0; i<arr2.length; i++){
        arr1[arr2[i]-1].classList.add('bomb');
    }
}


/**
 * Stampa in console la cella cliccata e restituisce l'elemento cella
 * @param {any} cell
 * @returns {HTMLElement}
 */
function returnCell(cell){
    // - stampo in console il numero della cella cliccata
    console.log(`Hai cliccato la cella n. ${cell}`);

    return cell;
}