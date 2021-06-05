import {Moves, BLIND} from './moves';

let mv1 = new Moves("player-1", 100);
let mv2 = new Moves("player-2", 100);

let gameSessionPot = 0;
let minGameMove = "";
const minBet = 5;
let numberOfPlayer = 2;
let playerList = new Map()

playerList.set("player-1", mv1)
playerList.set("player-2", mv2)

test('evaluate name', ()=>{
    // INTIATE PLAYER.

    // 1. Get Player Entry.
    // 1.a check if the entries is possible
    // 1.b get the player entry
    // 1.c increment the pot size

    mv1.decCoin(minBet)
    mv2.decCoin(minBet)
    gameSessionPot += (numberOfPlayer*minBet)

    // 3. P1 blind move
    mv1.getPlayerMove("BLIND", 5)
    // 3.a decrement the player coin
    mv1.decCoin(mv1.getCurrentStake)
    // 3.b increase the pot
    gameSessionPot += mv1.getCurrentStake
    // 3.c change the player turn in game session

    // 4. P2 blind move
    mv2.getPlayerMove("BLIND", 5)
    // 4.a decrement the player coin
    mv2.decCoin(mv2.getCurrentStake)
    // 4.b increase the pot
    gameSessionPot += mv2.getCurrentStake
    // 4.c change the player turn in game session

    // 5. P1 blind move
    mv1.getPlayerMove("CHECK", 10)
    // 5.a decrement the player coin
    mv1.decCoin(mv1.getCurrentStake)
    // 5.b increase the pot
    gameSessionPot += mv1.getCurrentStake
    // 5.c change the player turn in game session

    // 6. P2 blind move
    mv2.getPlayerMove("CHECK", 10)
    // 6.a decrement the player coin
    mv2.decCoin(mv2.getCurrentStake)
    // 6.b increase the pot
    gameSessionPot += mv2.getCurrentStake
    // 6.c change the player turn in game session

    // 7. P1 blind move
    mv1.getPlayerMove("SHOW", 10)
    // 7.a decrement the player coin
    mv1.decCoin(mv1.getCurrentStake)
    // 7.b increase the pot
    gameSessionPot += mv1.getCurrentStake
    // 7.c change the player turn in game session

    // 8. P2 blind move
    mv2.getPlayerMove("SHOW", 10)
    // 7.a decrement the player coin
    mv2.decCoin(mv1.getCurrentStake)
    // 7.b increase the pot
    gameSessionPot += mv2.getCurrentStake
    // 7.c change the player turn in game session


    expect(mv1.getName).toEqual("player-1");

    console.log(mv1.getCoin)
    console.log(mv2.getCoin)
    console.log(gameSessionPot)






})


/*
1. player 
1. p1. Blind Move
*/ 