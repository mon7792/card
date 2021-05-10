const card = require('../card/card');
// GAME ACTION LIST
const startGameAction = "START_GAME"
const serveGameAction = "SERVE_GAME"


// gameStateStructure format in which game state is transferred between the client and server.
let gameStateStructure = {action: "", payload: {}};
let gamePayloadStructure = {gameId:"", playerId: "", message:""}

// gameState store the state for the current game.
let gameState = {
    gameId: "",
    player1: {
        name: "",
        cards :{},
    },
    player2: {
        name: "",
        cards :{},
    },
    result: "",
    state: "", // CONNECT,START, IN_PROGRESS, END
}


function decodeGameState(gameState){
    let gameStateObj = JSON.parse(gameState);
    // TODO: verify the structure.
    if (gameStateObj.action === startGameAction){
        console.log(gameStateObj.payload.gameId);
        console.log(gameStateObj.payload.playerId);
    }
    return gameStateObj
}

function getResponse(gameStateObj){
    let crd = card.cardDeck;
    card.shuffle(crd);
    let playerCrd = [];
    playerCrd.push(crd[0]);
    playerCrd.push(crd[1]);
    playerCrd.push(crd[2]);
    if (gameStateObj.action === startGameAction){
        gameStateObj.action = serveGameAction;
        gameStateObj.payload.message = playerCrd
    }

    return gameStateObj
}


module.exports ={gameState: "we", decodeGameState, getResponse} ;