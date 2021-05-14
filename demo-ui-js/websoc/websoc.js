class Room {
    constructor(){
        // room will "game-id": [ws-1,ws-2]
        this.room = new Map();
    }

    newRoom(){
        let roomID = makeid(5)
        this.room.set(roomID, []);
    }

    deleteRoom(roomID){
        this.room.delete(roomID);
    }

    addMemberToRoom(roomID, memberID){
        let members = this.room.get(roomID);
        members.push(memberID);

        this.room.set(roomID, members)
    }

    removeMemberFromRoom(roomID, memberID){
        let members = this.room.get(roomID)
        let rmIndex = members.indexOf(memberID)
        members.splice(rmIndex, 1)
        this.room.set(roomID, members)
    }

    checkRoomExist(roomID){
        return this.room.has(roomID)
    }
}

module.exports ={ Room}


// TODO: come with better game naming logic
function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}