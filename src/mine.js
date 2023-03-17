//initialisierung der variablen
const GameState = require ("./game").GameState;
let board = [];
let board2 = [];
let bombs = 9;
let platzhalter;
let state;
//erstellen von 2d array 

function startgame(message){
    
    let split = message.content.split(" ");
    //holt die x und y Position raus
    inY = split[1];
    inX = split[2];
    if (split.length == 2||inX<0||inX>9||inY<0||inY>9) {
        message.channel.send("Please enter two valid numbers between 0-9: minesweeper x y");
        return;
    }
    if(state!=GameState.Running){
        initboard();
        state=GameState.Running;
        showboard(message, board2);
    }
    openfield(message);
    showboard(message, board2);
    if(haswon()){
        message.channel.send("You won");
        //TODO point to minesweeper DB
    }
}

function haswon(){
    for(let i =0;i<=9;i++){
        for(let i2=0;i2<=9;i2++){
            //wenn es mit dem originalen board nicht übereinstimmt und es keine bombe ist returnt er false
            if(board2[i][i2]!=board[i][i2]&&board[i][i2]!="B"){
                return false;
            }
        }
    }
    return true;
}

function openfield(message){
    let split = message.content.split(" ");
    //holt die x und y Position raus
    inY = split[1];
    inX = split[2];
    console.log(board);
    
    if(board[inX][inY]=="B"){
        board2[inX][inY]=board[inX][inY];
        message.channel.send("You DIED try again");
        showboard(message, board);
        initboard();
        return;
    }
    board2[inX][inY]=board[inX][inY];
}

function initboard(){
    //Beide arrays werden angelegt und auf 0 beziehungsweise leerzeichen gesetzt
    for(let i = 0; i<=9; i++){
        board[i] = [];
        for(let y=0;y<=9;y++){
            board[i][y]= "0";
        }
    }
    for(let i = 0; i<=9; i++){
        board2[i] = [];
        for(let y=0;y<=9;y++){
            board2[i][y]= " ";
        }
    }
    
    //Bomben werden random gesetzt (Math.floor für keine kommazahlen)
    for(let i=0;i<=9;i++){
        board[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 10)]="B";
    }
    //anzeige wie viele bomben im umkreis sind
    for(let x=0;x<=9;x++){
        for(let y=0;y<=9;y++){
            if(board[x][y]=="B"){
                if(x-1>=0){
                    if(y-1>=0){
                        //links oben
                        if(board[x-1][y-1]!="B"){
                            platzhalter=parseInt(board[x-1][y-1]);
                            platzhalter++;
                            board[x-1][y-1]=platzhalter.toString();
                        }
                        //links mitte
                        if(board[x][y-1]!="B"){
                            platzhalter=parseInt(board[x][y-1]);
                            platzhalter++;
                            board[x][y-1]=platzhalter.toString();
                        }
                    }
                    //oben mitte
                    if(board[x-1][y]!="B"){
                        platzhalter=parseInt(board[x-1][y]);
                        platzhalter++;
                        board[x-1][y]=platzhalter.toString();
                    }
                }
                else if(y-1>=0){
                    //links mitte
                    if(board[x][y-1]!="B"){
                        platzhalter=parseInt(board[x][y-1]);
                        platzhalter++;
                        board[x][y-1]=platzhalter.toString();
                    }
                }
                if(x+1<=9){
                    if(y+1<=9){
                        //mitte unten
                        if(board[x][y+1]!="B"){
                            platzhalter=parseInt(board[x][y+1]);
                            platzhalter++;
                            board[x][y+1]=platzhalter.toString();
                        }
                        //rechts unten
                        if(board[x+1][y+1]!="B"){
                            platzhalter=parseInt(board[x+1][y+1]);
                            platzhalter++;
                            board[x+1][y+1]=platzhalter.toString();
                        }
                    }
                    //mitte rechts
                    if(board[x+1][y]!="B"){
                        platzhalter=parseInt(board[x+1][y]);
                        platzhalter++;
                        board[x+1][y]=platzhalter.toString();
                    }
                }
                else if(y+1<=9){
                    //mitte unten
                    if(board[x][y+1]!="B"){
                        platzhalter=parseInt(board[x][y+1]);
                        platzhalter++;
                        board[x][y+1]=platzhalter.toString();
                    }
                }
                if(y+1<=9&&x-1>=0){
                    //links unten
                    if(board[x-1][y+1]!="B"){
                        platzhalter=parseInt(board[x-1][y+1]);
                        platzhalter++;
                        board[x-1][y+1]=platzhalter.toString();
                    }
                }
                if(x+1<=9&&y-1>=0){
                    //rechts unten
                    if(board[x+1][y-1]!="B"){
                        platzhalter=parseInt(board[x+1][y-1]);
                        platzhalter++;
                        board[x+1][y-1]=platzhalter.toString();
                    }
                }
            }
        }
    }
}

function showboard(message, board3){
    let out = "```";
    for (let y = 0; y <= 9; y++) {
        out += " ";
        for (let x = 0; x <= 9; x++) {
            out += board3[y][x];
            
            if (x < 9) out += " │ ";
        }
        out += " ";
        if (y < 9) out += "\n───┼───┼───┼───┼───┼───┼───┼───┼───┼───\n";
    }
    out += "```";
    message.channel.send(out);
}

module.exports = {
    startgame
}
