const card = require('../card/card');

let gameSession = new Map();

// GAME ACTION LIST
const startGameAction = "START_GAME"
const serveGameAction = "SERVE_GAME"
const waitGameAction = "WAIT_GAME"
const joinGameAction = "JOIN_GAME"
const checkGameAction = "CHECK_GAME"

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

// getResponse return the respnse to all, single
function getResponse(gameStateObj){
    console.log(gameSession.get("dummy-1"))
    //
    if (gameStateObj.action === startGameAction){
        gameStateObj.action = waitGameAction;
        gameStateObj.payload = {}

        return [ false, gameStateObj]
    }

    if (gameStateObj.action === joinGameAction){
        gameStateObj.action = serveGameAction;
        gameStateObj.payload = gameSession.get("dummy-1").player2

        return [true, gameStateObj]
    }

    return [false, gameStateObj]
}

function handleMessage(gameStateObj) {
    if (gameStateObj.action === startGameAction){
        registerGame()
    }

    if (gameStateObj.action === joinGameAction){
        // append the card in the second player
        joinGame(gameStateObj.payload.gameId);
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

// joinGame adds the cards for 2nd player.
function joinGame(gameID){
    let gSession = gameSession.get(gameID)
    gSession.player2.name = "player-2"
    gSession.player2.cards.push(gSession.deck[3])
    gSession.player2.cards.push(gSession.deck[4])
    gSession.player2.cards.push(gSession.deck[5])

    gameSession.set("dummy-1", gSession);
}

// SOLID APPROACH.

class Game{

    getGameID(gameState){
        return gameState.payload.gameId
    }
    decodeState(message){
        let gameState = null;
        try {
            gameState = JSON.parse(message)
        } catch (e) {
            console.error(`unable to decode the message: ${message} | error: ${e}`)
            return gameState
        }

        // TODO: validate the message
        return gameState
    }

    // registerUser return boolean operator based on the gameState Msg
    registerUser(gameState){
        return gameState.action === startGameAction || gameState.action === joinGameAction ;
    }

    newGame(gameState){
        return gameState.action === startGameAction
    }

    joinGame(gameState){
        return gameState.action === joinGameAction
    }

    checkGame(gameState){
        return gameState.action === checkGameAction
    }

    // registerGame creates a new
    registerGame(gameID){
        let crd = card.cardDeck;
        card.shuffle(crd);
        let playerCrd = [];
        playerCrd.push(crd[0]);
        playerCrd.push(crd[1]);
        playerCrd.push(crd[2]);

        let gameState = defGameState;
        gameState.deck = crd;
        gameState.gameId = gameID;
        gameState.player1.name = "player1"
        gameState.player1.cards = playerCrd

        let player2Crd = [];
        player2Crd.push(crd[3]);
        player2Crd.push(crd[4]);
        player2Crd.push(crd[5]);

        gameState.player2.name = "player2"
        gameState.player2.cards = player2Crd
        return gameState
    }

    updateGameState(gameState, gameID, memberID){
        gameState.payload.gameId =  gameID
        gameState.payload.playerId =  memberID
        return gameState
    }
}


module.exports ={decodeGameState, getResponse, handleMessage, Game} ;