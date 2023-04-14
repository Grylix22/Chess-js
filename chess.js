const king = document.querySelectorAll('.kingB');
const queen = document.querySelectorAll('.queenB');
const bishop = document.querySelectorAll('.bishopB');
const knight = document.querySelectorAll('.knightB');
const rook = document.querySelectorAll('.rookB');
const pawn = document.querySelectorAll('.pawnB');
const boxes = document.querySelectorAll('.box');

var posStart = 0;        //pozycja pierwszego ruchu, startowa
var posEnd = 0;          //pozycja drugiego kliknięcia, docelowa
var figStartName = 0;    //nazwa figury z miejsca startowego
var figEndName = 0;      //nazwa figury z miejsca docelowego
var figBName = 0;        //nazwa figury z pola posStart
var moveNr = 1;          //ilość ruchów gracza ewentualnie gracza białego czyli tur
var kingsAlive;          //bool, 1 - królowie żyją, 0 - nie istnieją dwaj królowie na planszy

var figColS;             //kolor figury z miejsca pierwszego kliknięcia
var figColE;             //kolor figury z miejsca drugiego kliknięcia

/* poruszanie figur
TODO: blokowanie ruchów niemożliwych dla figury np króla o dwa pola*/
function moves() { //sprawić by sprawdzało czy kliknięty jest box do czasu zakończenia gry
boxes.forEach(box => {
    box.addEventListener('click', function handleClick(event) {
        figBName = event.target.classList[2];
        if((figBName != undefined && posStart === 0) || (figBName === undefined && posStart === 0)) {
                if(posStart === 0) {
                    figStartName = figBName;
                    posStart = event.target.id;
                    console.log("klik", "1:", posStart, "2:", posEnd, "kto:", figBName);
                    allowedFigureMoveCheck();
                }
        }
        else if(posStart != 0 && posEnd === 0) {
                posEnd = event.target.id;
                figEndName = event.target.classList[2];
                capture();
                
                moveNr++
                console.log("Ruch: ", moveNr, "\n \n \n");
                return;
            }
    });
});
}

//sprawdź zazn figurę przez figname lub figbname i ustaw pola wokół posStart na które figura może się ruszyć

// zbijanie
function capture() {
    //zbijanie
    const actIdStart = document.getElementById(posStart);
    const actIdEnd = document.getElementById(posEnd);
    if(actIdEnd.classList[2] !=  undefined) { //czy następuje bicie
    figColS = actIdStart.classList[2].slice(-1); //ostatnia litera klasy figury z pozycji startowej
    figColE = actIdEnd.classList[2].slice(-1); //ostatnia litera klasy figury z pozycji końcowej
    console.log(figColS, figColE, actIdEnd.classList[2])

        if(actIdEnd.classList[2] != undefined && figColS != figColE) {
            const posS = document.getElementById(posStart);
            const posE = document.getElementById(posEnd);

            posS.classList.remove(figStartName);
            posE.classList.remove(figEndName);
            posE.classList.toggle(figStartName);
            
            figColE, figColS = 0;
            //if figura zbijana to król-W/B wygrywa figColS i wypisz to w divie na środku ekranu
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
        console.log("błędny ruch, nie można iść na pole z własną figurą");
    }

    console.log('Ruch:', figStartName, posStart, '->', posEnd);
    figStartName = 0;
    posStart = 0;
    posEnd = 0;
}

//zegary

            /*zarządzanie stroną*/

function restart() {
    location.reload();
}

function endGame() {
    //jeżeli królowie są żywi zwracaj 1;
}

function allowedFigureMoveCheck() {
    //checking allowed to move this figure to move from x to y position on the actual board.
    if(figBName === "rookB" || figBName === "rookW") {
        const yxStart = posStart;
        console.log("pozycja:", posStart, "i:", i, "j:", j, "poz Y:", y, "poz X:", x);
        var y = posStart.charAt(0);
        var x = posStart.charAt(1); //z nieznanego mi powodu tu kończy się funkcja lub silnik wychodzi z niej
        for(let i = 1; i == 8; i++) { 
            for(let j = 1; j == 8; j++) {
                console.log("pętla");
                //console.log("pozycja:", posStart, "i:", i, "j:", j, "poz Y:", y, "poz X:", x);
            }
        }
        //w kolumnie lub rzędzie o nieograniczoną ilość pół
        //pętla sprawdzająca pierwszą i drugą liczbę id boxa, 1_ - y | _1 - x
    }
    else if(figBName === "bishopB" || figBName === "bishopW") {
        // dwa pola w danym kierunku i jeden skierowany o 90 stopni. "L" w każdym kierunku
    }
    else if(figBName === "queenB" || figBName === "queenW") {
        //ruch o jeden dookoła + możliwości rook i bishop
    }
    else if(figBName === "kingB" || figBName === "kingW") {
        //ruch o jeden w każdym kierunku
    }
    else if(figBName === "pawnB" || figBName === "pawnW") {
        //jeżeli to pierwszy ruch tej figury do przodu o max 2 pola, jeżeli drugi max 0 1, lub bicie po skosie
    }
}

moves(); //launching moves module

/* funkcja wypisująca ruchy w postaci: [numer]. [kolorFigura] [pozycja startowa] -> [pozycja końcowa]
 pozycja startowa i końcowa oznaczona na kolor np. przezroczystość 0.4 pomarańczowy

 kolejna funkcja pozwalająca zarówno na przeciąganie figur jak i klikanie figury a następnie miejsca
     gdzie ma się przesunąć

 wziąć id zaznaczonego diva, usunąć klasę danego rodzaju figury z niego i dodać do diva docelowego.

 trzeba ustawić nasłuchiwanie na kliknięcie na figurę (tą bg-img: figura.png) która potem przeniesie się do
  zaznaczonym po niej polu o ile będzie to "czysty" ruch (taki, który można wykonać)*/