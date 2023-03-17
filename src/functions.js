const ttt = require('./tictactoe.js');
const fw = require('./4wins.js');
const ms = require ('./mine');

function abstimmung(message) {
    if (message.content.substring(11) === "Hurensohn") {
        message.author.send("jap, find ich auch");
    }
    // nimmt alles hinter "abstimmung" und schickt es in den Channel
    message.delete();
    message.channel.send(message.content.substring(11)).then(sentEmbed => {
        //reagiert auf seine nachricht mit daumen hoch/runter
        sentEmbed.react("👍");
        sentEmbed.react("👎");
    })
}

function help(message) {
    //erstellt ein embed
    const embed = {
        //Schreibt Commands als überschrift
        "title": "Commands:",
        //setzt rand seines textes grün
        "color": 65280,
        "description": "test: sends Hello name \na: sends a \ni love you: sends no love allowed :P \ni love me: sends selfish bastard\nsad smilie: sends dont worry be happy\nsutoppu: stops bot\nin work: shows what we are working on\nttt nr nr: starts tictactoe\n4winpc: starts 4 gewinnt"
    };
    //sendet das embed
    message.channel.send({embed})
}

function inWork(message) {
    const embed = {
        "title": "We are working on",
        "color": 15548997,
        "description": "Achievments, \nEastereggs, \n4-Gewinnt, \nabstimmung"
    };
    message.channel.send({embed})
}

function test(message) {
    //"<@" + message.author + ">" ist fürs Pingen
    message.channel.send("Hello <@" + message.author + "> :slight_smile:");
}

function a(message) {
    message.channel.send("a");
    /*connection.query("SELECT * FROM discord-bot", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    */
}

function iLoveYou(message) {
    message.channel.send("no love allowed :P");
}

function iLoveMe(message) {
    message.channel.send("selfish bastard");
}

function sadEmoji(message) {
    //sendet emojis und dont worry be happy
    message.channel.send(":slight_smile: don't worry, be happy! :slight_smile:");
}

function sutoppu(message) {
    //stellt den bot ab
    message.client.destroy();
}

function tictactoe(message) {
    //geht zu der funktion runcycle in tictactoe.js
    ttt.runCycle(message);
}

function fourWin(message) {
    //geht zu der funktion startgame in 4wins.js
    fw.startGame(message);
}
function minesweeper(message){
    ms.startgame(message);
}

//funktioniert nicht
async function play(message){
    await message.member.voice.channel.join();

    await ytdl("https://www.youtube.com/watch?v=qNIhngowViI", {
        filter: "audioonly",
        opusEncoded: true,
        fmt: "mp3",
        encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
    });

    then(connection => {
        connection.play(stream, {
            type: "converted"
        })
    })
}

async function disconnect(message){
    message.member.voice.channel.leave();
}

function db(){}

//exportiert alle funktionen
module.exports = {
    abstimmung, help, inWork, test, a, iLoveYou, iLoveMe, sadEmoji, sutoppu, nsfw, tictactoe, fourWin, play, disconnect, minesweeper
}
