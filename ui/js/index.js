// websocket

// InitiateSession return web socket object.
function InitiateSession(){    
const ws = new WebSocket("ws://localhost:5000")
// RECEVING MESSAGE FROM SERVER
ws.onmessage = function(evt){
    let rsp = JSON.parse(evt.data);
    if (rsp.action === serveGameAction){
        console.log(rsp.payload);
        displayCardsFromWebSoc(rsp.payload.message);
    }
}

// SENDING MESSAGE TO SERVER
ws.onopen = function(evt){
    ws.send(JSON.stringify(startGame));
}
// ERROR IN WEBSOCKET
ws.onerror = function(evt){console.log(evt.data)};

//  CLOSING WEBSOCKET CONNECTION
ws.onclose = function(evt){
    console.log("closing websocket connection");
    console.log(evt.data);
};
return ws
}


// StartSession return web socket object.
function StartSession(){
    const ws = new WebSocket("ws://localhost:5000")
// RECEVING MESSAGE FROM SERVER
    ws.onmessage = function(evt){
        let rsp = JSON.parse(evt.data);
        if (rsp.action === serveGameAction){
            console.log(rsp.payload);
            displayCardsFromWebSoc(rsp.payload.cards);
        }
    }

// SENDING MESSAGE TO SERVER
    ws.onopen = function(evt){
        console.log("websocket open")
        // ws.send(JSON.stringify(startGame));
    }
// ERROR IN WEBSOCKET
    ws.onerror = function(evt){console.log(evt.data)};

//  CLOSING WEBSOCKET CONNECTION
    ws.onclose = function(evt){
        console.log("closing websocket connection");
        console.log(evt.data);
    };
    return ws;
}


// GAME STATE
let gameStateStructure = {action: "", payload: {}};

// START_GAME 
let newGame = {}
newGame["message"] = ""
newGame["gameId"] = "dummy-game-id"
newGame["playerId"] = "dummy-player-id"

const startGameAction = "START_GAME";
const serveGameAction = "SERVE_GAME";
const joinGameAction = "JOIN_GAME";
const checkGameAction = "CHECK_GAME";


let startGame = {action: startGameAction, payload: newGame};
let joinGame = {action: joinGameAction, payload: {}};
let checkGame = {action: checkGameAction, payload: {}};
