import {Player} from '../player/player';
/**
 * moves evaluates the current allowed moves
 */

export const BLIND = "BLIND";
export const CHECK = "CHECK";
export const RAISE = "RAISE";
export const SHOW = "CHECK";
export const FLOP = "FLOP";

export class Moves extends Player{
    constructor(id, name, coin){
        super(id, name, coin);
        this.blind = true;
        this.check = true;
        this.raise = true;
        this.show = true;
        this.flop = true;
        this.highestMove = BLIND;
        this.currentMove = "";
        this.currentStake = 0;
        this.opponentMove = "";

    }

    get getCurrentStake(){
        return this.currentStake;
    }
    // evaluateMove checks if the current move is possible.
    // , currentPlayerCoin, currentMinGameStake
    evaluateMove(move){
        //
        if (move !== BLIND){
            this.blind = false
        }
    }


    getPlayerMove(move, stake){
        this.currentMove = move;
        this.currentStake = stake;
    }

    
}