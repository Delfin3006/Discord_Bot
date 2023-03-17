const GameState = require ("./game").GameState;
const Field = require ("./game").Field;
let ID="";
let won = true;
let field = [];

// ttt x y
function runCycle(message) {
    
    if(ID!=""&&ID!=message.member.user.id) return;
    ID=message.member.user.id;
    let inX;
    let inY;
    //splittet die nachricht bei leerzeichen
    let split = message.content.split(" ");
    if (split.length !=2) {
        message.channel.send("Something went wrong");
        return;
    }
    //holt die x und y Position raus
    inX = split[1];
    inY = split[2];
    console.log(field);

    //guckt ob richtige zahlen in der variable ist
    if (split.length >= 3 && (inX < 1 || inX > 3 || inY < 1 || inY > 3)) {
        message.channel.send("Please enter two valid numbers! : ttt x y");
        return;
    }

    //guckt, ob ein neues spiel beginnt
    let doesBotStart = won && split.length < 3;
    let state;
    //wenn gewonnen, dann resetten
    if (won) reset();
    if (doesBotStart) {
        //geht in die funktion botmove
        botMove();
        showField(message);
        return;
    }

    inX--;
    inY--;
    if (field[inY][inX] !== Field.Empty) {
        message.channel.send("This field is already taken!");
        return;
    }
    field[inY][inX] = Field.Player;
    state = checkState();
    if (state === GameState.Running) {
        botMove();
        state = checkState();
    }
    showField(message);
    if (state !== GameState.Running) {
        won = true;
        message.channel.send(getWinMessage(state));
    }
}

function getWinMessage(state) {
    if (state === GameState.PlayerWon){ 
        //TODO add point to ttt in DB
        return "You won against the bot!";
}
    if (state === GameState.BotWon) return "You lost against the bot!";
    if (state === GameState.Draw) return "It's a draw!";
    return "Something went wrong!";
}

function botMove() {
    while (true) {
        //würfelt random 
        let x = Math.floor(Math.random() * 3);
        let y = Math.floor(Math.random() * 3);
        //guckt, ob das feld leer ist
        if (field[y][x] === Field.Empty) {
            field[y][x] = Field.Bot;
            break;
        }
    }
}

function isFieldFull() {
    for (let y = 0; y <= 3; y++) {
        for (let x = 0; x <= 3; x++) {
            if (field[y][x] === Field.Empty) return false;
        }
    }
    return true;
}

function checkState() {
    // Check horizontal
    for (let y = 0; y < 3; y++)
        if (field[y][0] !== Field.Empty
            && field[y][0] === field[y][1]
            && field[y][0] === field[y][2]
            )
            return field[y][0];
    // Check vertical
    for (let x = 0; x < 3; x++)
        if (field[0][x] !== Field.Empty
            && field[0][x] === field[1][x]
            && field[0][x] === field[2][x])
            return field[0][x];
    // Check diagonal
    if (field[0][0] !== Field.Empty
        && field[0][0] === field[1][1]
        && field[0][0] === field[2][2])
        return field[0][0];
    if (field[0][2] !== Field.Empty
        && field[0][2] === field[1][1]
        && field[0][2] === field[2][0])
        return field[0][2];

    // Check draw
    if (isFieldFull()) return GameState.Draw;
    return GameState.Running;
}


function getFieldChar(fieldElem) {
    if (fieldElem === Field.Empty) return " ";
    if (fieldElem === Field.Player) return "X";
    if (fieldElem === Field.Bot) return "O";
    return "?";
}

// ─ │ ┼
function showField(message) {
    let out = "```";
    for (let y = 0; y < 3; y++) {
        out += " "
        for (let x = 0; x < 3; x++) {
            out += getFieldChar(field[y][x]);
            console.log(field[x][y]);
            if (x < 2) out += " │ ";
        }
        out += " ";
        if (y < 2) out += "\n───┼───┼───\n";
    }
    out += "```";
    message.channel.send(out);
}

function reset() {
    console.log("Resetting field");
    ID="";
    won = false;
    for (let i = 0; i < 3; i++) {
        field[i] = [Field.Empty, Field.Empty, Field.Empty];
    }
}

module.exports = {
    runCycle
}
