// GAME ACTION LIST
const startGameAction = "START_GAME"


// gameStateStructure format in which game state is transferred between the client and server.
let gameStateStructure = {action: "", payload: {}};
let gamePayloadStructure = {gameId:"", playerId: "", message:""}


function decodeGameState(gameState){
    let gameStateObj = JSON.parse(gameState);
    // TODO: verify the structure.
    if (gameStateObj.action == startGameAction){
        console.log(gameStateObj.payload.gameId);
        console.log(gameStateObj.payload.playerId);
    }
}


module.exports ={gamestate: "we", decodeGameState} ;