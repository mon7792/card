// websocket

function InitiateSession(){    
let ws = new WebSocket("ws://localhost:5000")
// RECEVING MESSAGE FROM SERVER
ws.onmessage = function(evt){console.log(evt.data);}

// SENDING MESSAGE TO SERVER
ws.onopen = function(evt){
    ws.send('SEND  FROM CLIENT');
}
// ERROR IN WEBSOCKET
ws.onerror = function(evt){console.log(evt.data)};

//  CLOSING WEBSOCKET CONNECTION
ws.onclose = function(evt){
    console.log("closing websocket connection");
    console.log(evt.data);
};
}