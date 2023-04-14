const king = document.querySelectorAll('.kingB');
const queen = document.querySelectorAll('.queenB');
const bishop = document.querySelectorAll('.bishopB');
const knight = document.querySelectorAll('.knightB');
const rook = document.querySelectorAll('.rookB');
const pawn = document.querySelectorAll('.pawnB');
const boxes = document.querySelectorAll('.box');

var posStart = 0;        //position on first click
var posEnd = 0;          //position on second click
var figStartName = 0;    //fig name of posStart
var figEndName = 0;      //fig name of posEnd
var figBName = 0;        //fig name of posStart
var moveNr = 1;          //move number
var kingsAlive;

var figColS;             //figure color from box under first click
var figColE;             //figure color from box under second click

/*                              figure moves*/

function moves() { //sprawić by sprawdzało czy kliknięty jest box do czasu zakończenia gry
boxes.forEach(box => {
    box.addEventListener('click', function handleClick(event) {
        figBName = event.target.classList[2];
        if((figBName != undefined && posStart === 0) || (figBName === undefined && posStart === 0)) {
                if(posStart === 0) {
                    figStartName = figBName;
                    posStart = event.target.id;
                    allowedFigureMoveCheck();
                }
        }
        else if(posStart != 0 && posEnd === 0) {
                posEnd = event.target.id;
                figEndName = event.target.classList[2];
                capture();
                
                moveNr++
                console.log("Move: ", moveNr, "\n \n \n");
                return;
            }
    });
});
}

//sprawdź zazn figurę przez figname lub figbname i ustaw pola wokół posStart na które figura może się ruszyć

// kill figure
function capture() {
    const actIdStart = document.getElementById(posStart);
    const actIdEnd = document.getElementById(posEnd);
    if(actIdEnd.classList[2] !=  undefined) { //second clicked box is empty?
    figColS = actIdStart.classList[2].slice(-1); //check color first clicked figure
    figColE = actIdEnd.classList[2].slice(-1); //check color second clicked figure
    console.log(figColS, figColE, actIdEnd.classList[2])

        if(actIdEnd.classList[2] != undefined && figColS != figColE) {
            const posS = document.getElementById(posStart);
            const posE = document.getElementById(posEnd);

            posS.classList.remove(figStartName);
            posE.classList.remove(figEndName);
            posE.classList.toggle(figStartName);
            
            figColE, figColS = 0;
        }
    }
    else if(actIdEnd.classList[2] != undefined && (figColS === figColE) || actIdEnd.classList[2] === undefined) {
        const posS = document.getElementById(posStart);
        const posE = document.getElementById(posEnd);

        posS.classList.remove(figStartName);
        posE.classList.remove(figEndName);
        posE.classList.toggle(figStartName);
        
        figColE, figColS = 0;
    } else {
        console.log("Error: this place is reserved");
    }

    console.log('Move:', figStartName, posStart, '->', posEnd);
    figStartName = 0;
    posStart = 0;
    posEnd = 0;
}

/*                      timers 
in working progress :)*/

            /*zarządzanie stroną*/

function restart() {
    location.reload();
}

function endGame() {
    //check gameover rules
}

function allowedFigureMoveCheck() {
    //checking all possible "white" moves
    if(figBName === "rookB" || figBName === "rookW") {
        const yxStart = posStart;
        console.log("allowedFigureMoveCheck function position before loop");
        var y = posStart.charAt(0);
        var x = posStart.charAt(1); //js just skipping a loop under this line !!!read about it
        for(let i = 1; i == 8; i++) { 
            for(let j = 1; j == 8; j++) {
                console.log("pętla");
                //console.log(allowedFigureMoveCheck function position after loop);
            }
        }
        //w kolumnie lub rzędzie o nieograniczoną ilość pół
        //pętla sprawdzająca pierwszą i drugą liczbę id boxa, 1_ - y | _1 - x
    }
    else if(figBName === "bishopB" || figBName === "bishopW") {
        
    }
    else if(figBName === "queenB" || figBName === "queenW") {
        
    }
    else if(figBName === "kingB" || figBName === "kingW") {
        
    }
    else if(figBName === "pawnB" || figBName === "pawnW") {
        
    }
}

moves();
