# Tin



## Game State.

{
    "game-id" : ""
    "player-id": ""
    "message": "" 
}

## EVENTS in GAME:


"START_GAME":(publish): start game
"JOIN_GAME":(publish): join the game

"SERVE_CARD":(subscribe): will send the cards.



## connect to the redis server.

docker pull redis
docker run --name redis-test-instance -p 6379:6379 -d redis


// TODO: Work on this
//https://tutorialedge.net/projects/chat-system-in-go-and-react/part-4-handling-multiple-clients/



## TODO:
Think of other way to handle outside client connection.