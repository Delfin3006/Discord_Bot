//variable mit vorgegebenen möglichkeiten
const GameState = {
    Running: 0,
    PlayerWon: 1, 
    BotWon: 2,
    Draw: 3,
}

const Field = {
    Empty: 0,
    Player: 1,
    Bot: 2,
}

exports.GameState = GameState;
exports.Field=Field;
