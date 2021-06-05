/**
 * player is responsible for the creation of the player in the game
 */


export class Player{
    constructor(playerName, playerCoin){
        this._name = playerName;
        this._coin = playerCoin;
    }

    get getName(){
        return this._name;
    }

    set setName(playerName){
        this._name = playerName;
    }

    get getCoin(){
        return this._coin;
    }

    set setCoin(playerCoin){
        this._coin = playerCoin;
    }

    incCoin(playerCoin){
        this._coin += playerCoin
    }

    decCoin(playerCoin){
        this._coin -= playerCoin
    }

}