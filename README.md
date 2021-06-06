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