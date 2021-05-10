const card = require('../card/card');

let gameSession = new Map();

// GAME ACTION LIST
const startGameAction = "START_GAME"
const serveGameAction = "SERVE_GAME"
const waitGameAction = "WAIT_GAME"

// gameStateStructure format in which game state is transferred between the client and server.
let gameStateStructure = {action: "", payload: {}};
let gamePayloadStructure = {gameId:"", playerId: "", message:""}

// defGameState store the state for the current game.
let defGameState = {
    deck : [],
    gameId: "",
    player1: {
        name: "",
        cards :[],
    },
    player2: {
        name: "",
        cards :[],
    },
    result: "",
    state: "", // CONNECT,START, IN_PROGRESS, END
}


function decodeGameState(gameState){
    let gameStateObj = JSON.parse(gameState);

    console.log(gameStateObj);
    // TODO: verify the structure.
    if (gameStateObj.action === startGameAction){
        console.log(gameStateObj.payload.gameId);
        console.log(gameStateObj.payload.playerId);
    }
    return gameStateObj
}

function getResponse(gameStateObj){
    console.log(gameSession.get("dummy-1"))
    //
    if (gameStateObj.action === startGameAction){
        gameStateObj.action = waitGameAction;
        gameStateObj.payload = {}
    }

    return gameStateObj
}

function handleMessage(gameStateObj) {
    if (gameStateObj.action === startGameAction){
        registerGame()
    }
}


// registerGame registers the game and return the game state.
function registerGame(){
    let crd = card.cardDeck;
    card.shuffle(crd);
    let playerCrd = [];
    playerCrd.push(crd[0]);
    playerCrd.push(crd[1]);
    playerCrd.push(crd[2]);

    let gameState = defGameState;
    gameState.deck = crd;
    gameState.gameId = "dummy-1"; // todo: auto generate
    gameState.player1.name = "player1"
    gameState.player1.cards = playerCrd

    gameSession.set("dummy-1", gameState);
}


module.exports ={gameState: "we", decodeGameState, getResponse, handleMessage} ;