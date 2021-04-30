
// CARD VARIABLE
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J","Q","K"];
let cardObject = { Value: "", Suit: ""};

// getNewDeck returns single card deck in order
function getNewDeck(){
    let deck = Array();
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            let card = {Suit: suits[i] ,Value: values[j]};
            deck.push(card);
        }
    }
    return deck;
}

// shuffle the deck
function shuffle(deck) {
    for (let i = 0; i < 1000; i++){
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));

        let tmp = deck[location1];
        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}


// start the game
let CardDeck = getNewDeck();
shuffle(CardDeck);
