const GameState = require ("./game").GameState;
const Field = require ("./game").Field;
//const func = require("./functions");
let state;

let won = true;
let feld = [];

function startGame(message) {
    if(won){
        reset();
        console.log("reset");
        won=false
    }
    if(message.content.substring(7)<0||message.content.substring(7)>6){
        message.channel.send("Something went wrong");
        return;
    }
    Einspieler();
    haswon(message);
    if(won) reset();
    eingabePC();
    initfeld(message);
    haswon(message);
    if(won) reset();
    
}

function haswon(message){
    if(!won)state=winner();
    /*getWinMessage(state);
    console.log(feld);
    if(state!=0)state=vertical();
    console.log(feld);
    if(state!=0)state=horizontal();
    console.log(feld);
    */
   console.log(state)
    if(state!=0){
        message.channel.send(getWinMessage(state));
        won=true;
    } 

    console.log(feld);
}

function getFieldChar(fieldElem) {
    if (fieldElem === Field.Empty) return " ";
    if (fieldElem === Field.Player) return "X";
    if (fieldElem === Field.Bot) return "O";
    return "?";
}

function initfeld(message) {
    let out = "```";
    out+=" 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6\n───┼───┼───┼───┼───┼───┼───\n"
    for (let y = 0; y < 6; y++) {
        out += " "
        for (let x = 0; x < 7; x++) {
            out += getFieldChar(feld[y][x]);
            if (x < 6) out += " │ ";
        }
        out += " ";
        if (y < 6) out += "\n───┼───┼───┼───┼───┼───┼───\n";
    }
    out += "```";
    message.channel.send(out);
}

function winner() {
    // winner vertikale
    for (let i = 5; i >= 0; i--) {
        for (let i2 = 0; i2 < 7; i2++) {
            if (i2 + 3 > 7 || feld[i][i2] == 0) {
            } // Alle fehler die auftreten können werden ausgeschlossen
            // fehler könnten sonst sein: Arrayoutofbounds, leeres object gucken
            else {
                if (feld[i][i2]==feld[i][i2 + 1] && feld[i][i2]==feld[i][i2 + 2]
                    && feld[i][i2]==feld[i][i2 + 3]) {
                    // versucht alle vertikalen zu finden
                    return feld[i][i2];
                }
            }
            if (i + 3 > 6 || feld[i][i2] == 0) {
            } else {
                if (feld[i][i2]==feld[i + 1][i2] && feld[i][i2]==feld[i + 2][i2]
                    && feld[i][i2]==feld[i + 3][i2]) {
                    // sucht alle horizontale
                    return feld[i][i2];
                }
            }
            if (i + 3 > 6 || i2 + 3 > 7 || feld[i][i2] == 0) {
            } else {

                if (feld[i][i2]==feld[i + 1][i2 + 1] && feld[i][i2]==feld[i + 2][i2 + 2]
                    && feld[i][i2]==feld[i + 3][i2 + 3]) {
                    // sucht alle steigenen Vertikalen
                    return feld[i][i2];
                }
            }
            if (i + 3 > 6 || i2 - 3 < 0 || feld[i][i2] == 0) {
            } else {
                if (feld[i][i2]==feld[i + 1][i2 - 1] && feld[i][i2]==feld[i + 2][i2 - 2]
                    && feld[i][i2]==feld[i + 3][i2 - 3]) {
                    // sucht alle fallende Vertikale
                    return feld[i][i2];
                }
            }
        }
    }
    return 0;
}
/*
function diagonal(){
    for(let y = 0; y<4; y++){
        for(let x = 0; x<3; x++){
            for(let i = 1; i<4; i++){
                if(feld[x][y]===Field.Empty||feld[x][y]!==feld[x+i][y+i]){
                    break;
                }
                if(i===3) return feld[x][y];
            }
        }
    }
    for(let x = 3; x<6;x++){
        for (let y = 0; y<3; y++){
            for(let i = 1; i<4; i++){
                console.log(x);
                if(feld[x][y]===Field.Empty||feld[x][y]!==feld[x-i][y+i]){
                    break;
                }
                if(i===3) return feld[x][y];
            }
        }
    }
    return false;
}
function horizontal(){
    for(let y = 0; y<=7;y++){
        for(let x = 0; x<3;x++){
            for(let i = 1;i<4;i++){
                if(feld[x][y]===Field.Empty||feld[x][y]!==feld[x+i][y+i]){
                    break;
                }
                if(i===3) return feld[x][y];
            }
        }
    }
    return false;
}

function vertical(){
    for(let x = 0; x<3;x++){
        for(let y = 0; y<7;y++){
            for(let i = 1;i<4;i++){
                if(feld[x][y]===Field.Empty||feld[x][y]!==feld[x+i][y+i]){
                    break;
                }
                if(i===3) return feld[x][y];
            }
        }
    }
    return false;
}
*/

function Einspieler(spalte) {
    for (let i = 0; i < 6; i++) {
        console.log("i=" + i + "feld=" + feld[i][spalte]);
        if (feld[i][spalte] == Field.Empty) { // geprüft in welche zeile es geht
            feld[i][spalte] = Field.Player; // X wird eingesetzt
            break; // for schleife wird abgebrochen
        }
    }
}

function eingabePC() {
    let spalte;

    spalte = Math.floor(Math.random() * 7);// random spalte wird erzeugt
    for (let i = 0; i < 6; i++) {
        if (feld[i][spalte] == Field.Empty) { // geprüft in welche zeile es geht
            feld[i][spalte] = Field.Bot;
            break; // for schleife wird abgebrochen damit die anderen nicht auch O gesetzt werden
        }
    }
}

function reset() {
    console.log("Resetting field");
    won = false;

    for (let i = 0; i < 6; i++) {
        feld[i] = [Field.Empty, Field.Empty, Field.Empty, Field.Empty, Field.Empty, Field.Empty, Field.Empty];
    }
    //console.log(feld);
}
function getWinMessage(state) {
    if (state === GameState.PlayerWon) return "You won against the bot!";
    if (state === GameState.BotWon) return "You lost against the bot!";
    if (state === GameState.Draw) return "It's a draw!";
    return "Something went wrong!";
}

module.exports = {
    startGame
}
