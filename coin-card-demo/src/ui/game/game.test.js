

/**
 * START GAME SESSION
 *  1. start game session
 *  2. add the player
 *  3. send the player moves
 *  ("player-1","MOVE", coin) 
 */

import { Moves } from "../moves/moves";

// 1. create a new game session.
let gm = new GameSession();

// 2. create players
let mv1 = new Moves("player-id-1", "player-1-name", 100);
let mv2 = new Moves("player-id-2", "player-2-name", 100);

// 3. add player to the game
gm.addPlayer("player-id-1", mv1);
gm.addPlayer("player-id-2", mv2);

test('game', () =>{})