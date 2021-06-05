
/*
 * game responsible for creation of new game 
 * 
 * 
*/

class GameSession{
    constructor(){
        this._id="";
        this._players = new Map();
        this._playerTurnID = "";
    }


    get getPlayersInSession(){
        return this._players
    }

    addPlayer(playerID, player){
        this._players.set(playerID, player)
    }
}