console.log('Loading...');
const Discord = require('discord.js');
const fs = require('fs');
require("./functions");
require("./functions");
const func = require("./functions");
const mysql = require('mysql');


const config = JSON.parse(fs.readFileSync('../config.json', 'utf8'));

const client = new Discord.Client();

/*
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gura',
    database: 'Discord_bot'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
    
});
*/

// Traurige Smilies
const sadEmojis = ["😦", "😭", "☹️", "😟", "😕", "🙁", "☹️", "😢", "😣", "😖", "😫", "😩", "🥺", "😥", "😨", "😰", "😓", "😞"];
// alle commands, die abgerufen werden
const commands = [
    // funktion, die abgerufen wird => wenn folgende bedingung erfüllt ist
    [func.abstimmung, (message) => { return message.content.startsWith("abstimmung"); }],
    [func.help, (message) => { return message.content.startsWith("bot help"); }],
    [func.inWork, (message) => { return message.content.startsWith("in work"); }],
    [func.test, (message) => { return message.content.startsWith("test"); }],
    [func.a, (message) => { return message.content === "a"; }],
    [func.iLoveYou, (message) => { return message.content.startsWith("i love you"); }],
    [func.iLoveMe, (message) => { return message.content.startsWith("i love me"); }],
    [func.sadEmoji, (message) => { return sadEmojis.filter(e => message.content.includes(e)).length !== 0; }],
    [func.sutoppu, (message) => { return message.content.startsWith("sutoppu"); }],
    [func.tictactoe, (message) => { return message.content.startsWith("ttt"); }],
    [func.fourWin, (message) => { return message.content.startsWith("4winpc"); }],
    [func.minesweeper, (message) => { return message.content.startsWith("minesweeper"); }],

];
// alle Async commands
const asynccommands = [
    [func.play, (message)=>{return message.content.startsWith("play");}],
    [func.disconnect, (message)=>{return message.content.startsWith("disconnect");}]

]
// client goes to a random channel every 30-60min and does a scream sound
// 12haferbrei

//Wenn bot online ist
client.on('ready', () => {
    //gibt seinen Discordtag aus
    console.log('Logged in as ' + client.user.tag);
    // gibt an, auf wie vielen servern er ist
    console.log('bot used on ' + client.guilds.cache.size + ' servers.');
    // setzt seine Aktivität auf A
    client.user.setActivity("A");
    client.channels.cache.get("1080816630877143061").send("Bot ist on");

    
    setInterval(function () {
        if(new Date().getHours() == 11 && new Date().getMinutes()==50){
            console.log("yep");
            client.channels.cache.get("1080816630877143061").send("wake up <@994647196228124772> :P");
        }
    }, 60000);
});

client.on('message', (message) => {
    if(message.author.id==611256165929582603){
        message.delete();
    }
    
   
    //console.log(message);
    if (!message.author.bot) {
        //geht alle commands durch (foreach schleife)
        for (const cmdObj of commands) {
            // guckt, ob bedingung des commands erfüllt ist 
            if (cmdObj[1](message)) {
                cmdObj[0](message);
            }
        }
    }
    
});

client.on('message', async message =>{
    if (!message.author.bot) {
        //geht alle asynccommands durch
        for (const cmdObj of asynccommands) {
            if (cmdObj[1](message)) {
                cmdObj[0](message);
            }
        }
    }
});

client.login(config.token);
