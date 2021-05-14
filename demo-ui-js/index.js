const express = require('express');
const ws = require('ws');
const game = require('./game/game');
const ps = require('./pubsub/pubsub');

const app = express();

let webSocClients = new Map();

const wsServer = new ws.Server({noServer: true});

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

const pubSUb = new ps.PubSubManager()
let gameStateObj = null;
wsServer.on('connection', socket => {

    socket.on('message', function (message) {
        //  DECODE THE MESSAGE
        gameStateObj = game.decodeGameState(message);

        // HANDLE THE MESSAGE
        game.handleMessage(gameStateObj)

        // GENERATE THE CONFIRMATION MESSAGE
        if (gameStateObj != null) {
            let [all ,result] = game.getResponse(gameStateObj);
            socket.send(JSON.stringify(result));
        }


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


// HELPER FUNCTION
function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}