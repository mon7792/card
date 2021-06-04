/**
 * player is responsible for the creation of the player in the game
 */


export class Player{
    constructor(name, coin){
        this._name = name;
        this._coin = coin;
    }

    get name(){
        return this._name;
    }

    set name(playerName){
        this._name = playerName;
    }

    get coin(){
        return this._coin;
    }

    set coin(playerCoin){
        this._coin = playerCoin;
    }
}