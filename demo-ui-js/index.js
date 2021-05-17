const express = require('express');
const ws = require('ws');
const game = require('./game/game');
const ps = require('./pubsub/pubsub');
const room = require('./websoc/websoc');

const app = express();
const wsServer = new ws.Server({noServer: true});

// gameStore store all the game state: this will be shifted to another 
let gameStore = new Map();
const gameRoom = new room.Room();
const gameCore = new game.Game();


// handleMessage is the core for handling the response back to websoc client.
function handleMessage(message, subscribers){
    console.log(message);
    // decode the message.
    gameStateObj = gameCore.decodeState(message);
    if (gameStateObj === null){
        return
    }

    switch (true) {
        case gameCore.newGame(gameStateObj):

        gameStateObj.action = "SERVE_GAME";
        let memID = gameStateObj.payload.playerId
        gameStateObj.payload = gameStore.get(gameStateObj.payload.gameId).player1

        let client = gameRoom.getMember(memID)
        if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(gameStateObj));
        }

        
        break;

        case  gameCore.joinGame(gameStateObj):
            gameStateObj.action = "SERVE_GAME";
            let mem2ID = gameStateObj.payload.playerId
            gameStateObj.payload = gameStore.get(gameStateObj.payload.gameId).player2

            let client2 = gameRoom.getMember(mem2ID)
            if (client2.readyState === ws.OPEN) {
                    client2.send(JSON.stringify(gameStateObj));
            }

        break;
    }



    // check the operation that must be done.


    // send the message.

}



const pubSub = new ps.PubSubManager(handleMessage);

let gameStateObj = null;
wsServer.on('connection', socket => {
    socket.on('message', function (message) {

        // DECODE THE MESSAGE
        gameStateObj = gameCore.decodeState(message);
        if (gameStateObj === null){
            return
        }

        switch (true) {
            case gameCore.newGame(gameStateObj):
                // create a new room
                let roomID = gameRoom.newRoom();

                // add the player to room
                gameRoom.addMemberToRoom(roomID, socket)

                // make a player entry
                let memberID = gameRoom.registerMember(socket)
                
                // create a game store.
                let gamestate = gameCore.registerGame(roomID);
                // update the message.
                gameStateObj = gameCore.updateGameState(gameStateObj, roomID, memberID)

                // store in game store
                gameStore.set(roomID, gamestate)

                // create a pub-sub channel for the room
                pubSub.createChannel(roomID)

                //  assign subscriber
                pubSub.subscribe(socket, roomID)

                // publish to channel
                pubSub.publisher(socket, roomID, JSON.stringify(gameStateObj))
                

                break;
            case  gameCore.joinGame(gameStateObj):
                //  TODO: work from here.
                //    check and join the room
                let gameID = gameCore.getGameID(gameStateObj);
                if(!gameRoom.checkRoomExist(gameID)){
                    return;
                }

                // add sub to the room. 
                gameRoom.addMemberToRoom(gameID, socket);

                // make a player entry
                let member2ID = gameRoom.registerMember(socket)

                gameStateObj = gameCore.updateGameState(gameStateObj, gameID, member2ID)

                //  assign subscriber
                pubSub.subscribe(socket, gameID)

                // publish to channel
                pubSub.publisher(socket, gameID,JSON.stringify(gameStateObj))

                break;
        }

        // HANDLE THE MESSAGE
        // game.handleMessage(gameStateObj)

        // GENERATE THE CONFIRMATION MESSAGE
        // if (gameStateObj != null) {
        //     let [all ,result] = game.getResponse(gameStateObj);
        //     socket.send(JSON.stringify(result));
        // }


        // TODO: enable when the need arises
        // wsServer.clients.forEach(function each(client) {
        //     if (client !== socket && client.readyState === ws.OPEN) {
        //         // CLIENT SEND  DATA
        //         client.send(data);
        //     }
        // });


    });


});


// `server` is a vanilla Node.js HTTP server, so use
const server = app.listen(5000);
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});

// wsServer.on('connection', function (socket, request){
//   socket.on('message', function (message) {
//
//     //TODO: register the user
//     if (message === "register"){
//       let usr = makeid(6);
//       webSocClients.set(socket,usr)
//       socket.send(`Welcome user: ${usr}`);
//     }
//
//     let msg = `${webSocClients.get(socket)} : ${message}`
//     console.log(msg);
//     wsServer.clients.forEach(function each(client) {
//       // console.log(client)
//         if (client !== socket && client.readyState === ws.OPEN){
//           client.send(msg);
//         }
//     })
//   });
// });