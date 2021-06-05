
/*
 * game responsible for creation of new game 
 * 
 * 
*/

class GameSession{
    constructor(players){
        this._session="dummy";
        this._players = players;
        this._playerTurnID = 1;
    }


    get getPlayersInSession(){
        return this._players
    }

    set setPlayersInSession(playerList){
        this._players = playerList
    }
}