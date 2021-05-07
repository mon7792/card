// websocket

// InitiateSession return web socket object.
function InitiateSession(){    
let ws = new WebSocket("ws://localhost:5000")
// RECEVING MESSAGE FROM SERVER
ws.onmessage = function(evt){
    let rsp = JSON.parse(evt.data);
    if (rsp.action == serveGameAction){
        console.log(rsp.payload.message);
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


// GAME STATE
let gameStateStructure = {action: "", payload: {}};

// START_GAME 
let newGame = {}
newGame["message"] = ""
newGame["gameId"] = "dummy-game-id"
newGame["playerId"] = "dummy-player-id"

const startGameAction = "START_GAME";
const serveGameAction = "SERVE_GAME";


let startGame = {action: startGameAction, payload: newGame};
