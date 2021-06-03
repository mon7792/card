/**
 * moves evaluates the current allowed moves
 */

const BLIND = "BLIND";
const CHECK = "CHECK";
const RAISE = "RAISE";
const SHOW = "CHECK";
const FLOP = "FLOP";

class Moves {
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