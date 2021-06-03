/**
 * moves evaluates the current allowed moves
 */

export const BLIND = "BLIND";
export const CHECK = "CHECK";
export const RAISE = "RAISE";
export const SHOW = "CHECK";
export const FLOP = "FLOP";

export class Moves {
    constructor(){
        this.blind = true;
        this.check = true;
        this.raise = true;
        this.show = true;
        this.flop = true;
    }
    // evaluateMove checks if the current move is possible.
    // , currentPlayerCoin, currentMinGameStake
    evaluateMove(currentMove){
        //
        if (currentMove !== BLIND){
            this.blind = false
        }
    }
}