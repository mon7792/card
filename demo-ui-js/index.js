const express = require('express');
const ws = require('ws');
const game = require('./game/game');

const app = express();

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', socket => {
  
    socket.on('message', message = function(data){
      game.decodeGameState(data);
      wsServer.clients.forEach(function each(client){
        if (client !== socket && client.readyState === ws.OPEN) {
          // CLIENT SEND  DATA
          client.send(data);
        }
      });
    });
    // semd message back to server.
    socket.send('GLOBAL MESSAGE');
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(5000);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});