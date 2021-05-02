
// CARD VARIABLE

const spades = "spades";
const diamonds = "diamonds";
const clubs = "clubs";
const hearts = "hearts";

const red = "red";
const black = "black";

let SuitColor = new Map();
SuitColor.set(spades, black);
SuitColor.set(clubs, black);
SuitColor.set(hearts, red);
SuitColor.set(diamonds, red);

let suits = [spades, diamonds, clubs, hearts];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J","Q","K", "A"];
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

// EvaluteTheWinner decide the winner between  player1 and player
function EvaluteTheWinner(player1Cards, player2Cards){
    let category = [];
    category.push(evaluateCardsCategory(player1Cards))
    category.push(evaluateCardsCategory(player2Cards))

    switch(true){
        case (category[0]>category[1]):
            return "player 1 win";
        case (category[1]>category[0]):
            return "player 2 win";
        default:
            return "draw";
    }

    // TODO: winning category.
    // 1. all the three card same number
    // 2. all the three card same suit, but in series, one having hightest number in the series win.
    // 3. all the three in series , one having hightest number in the series win, different suit
    // 4. all the three card in same suit not in series, one with the hightes number win
    // 5. all the three card in pair,
    // 6. hightest card wins. 

}

// evaluateCardsCategory checks in which category the players card belong.
function evaluateCardsCategory(playerCards){
    let category;

    switch(true){
        case (checkCardSameNumber(playerCards) == true):
            category = 1;
            break;
        case (checkCardSameSuitInSeries(playerCards) == true):
            category = 2;
            break;
        case (checkCardDifferentSuitInSeries(playerCards) == true):
            category = 3;
            break;
        case (checkCardSameSuitNotInSeries(playerCards) == true):
            category = 4;
            break;
        case (checkCardInPair(playerCards) == true):
            category = 5;
            break;
        default:
            category = 6;

    }

    return category;
}

// 1. checkCardSameNumber check if all the three card same number.
function checkCardSameNumber(playerCards){
    return playerCards[0].Value == playerCards[1].Value && playerCards[1].Value == playerCards[2].Value && playerCards[0].Value == playerCards[2].Value  
}

// 2. checkCardSameSuitInSeries check if the player cards are in same color and in series
function checkCardSameSuitInSeries(playerCards){
    // check in same suit
    if (!(helperCheckInSuit(playerCards[0].Suit,playerCards[1].Suit,playerCards[2].Suit))){
        return false
    }
    
    return helperCheckInSeries(playerCards[0].Value, playerCards[1].Value, playerCards[2].Value)
}

// 3. checkCardDifferentSuitInSeries check if the player cards are in different color and in Series.
function checkCardDifferentSuitInSeries(playerCards){
    // check in different suit.
    if (helperCheckInSuit(playerCards[0].Suit,playerCards[1].Suit,playerCards[2].Suit)){
        return false
    }
    
    return helperCheckInSeries(playerCards[0].Value, playerCards[1].Value, playerCards[2].Value)
}

// 4. checkCardSameSuitNotInSeries check if the player cards are in same color and not in series
function checkCardSameSuitNotInSeries(playerCards){
    // check in same suit
    if (!(helperCheckInSuit(playerCards[0].Suit,playerCards[1].Suit,playerCards[2].Suit))){
        return false
    }
    
    return !(helperCheckInSeries(playerCards[0].Value, playerCards[1].Value, playerCards[2].Value))
}

// 5. checkCardInPair check if the player cards are in pair.
function checkCardInPair(playerCards){   
    return (playerCards[0].Value == playerCards[1].Value|| playerCards[1].Value == playerCards[2].Value || playerCards[0].Value == playerCards[2].Value);
}

// 6. getHightestCard get the highest card.
function getHightestCard(playerCards){
    let cardIndex = [];
    cardIndex.push(values.indexOf(playerCards[0].Value));
    cardIndex.push(values.indexOf(playerCards[1].Value));
    cardIndex.push(values.indexOf(playerCards[2].Value));
    cardIndex.sort();

    return values[cardIndex[2]]
}

// helperCheckInSuit check if the card in same suit.
function helperCheckInSuit(cardNo1,cardNo2,cardNo3){
    return (cardNo1.Suit == cardNo2.Suit && cardNo2.Suit == cardNo3.Suit && cardNo1.Suit == cardNo3.Suit)
}

// helperCheckInSeries check if the number are in series.
function helperCheckInSeries(cardNo1,cardNo2,cardNo3){
    let cardIndex = [];
    cardIndex.push(values.indexOf(cardNo1));
    cardIndex.push(values.indexOf(cardNo2));
    cardIndex.push(values.indexOf(cardNo3));

    cardIndex.sort();
    
    // check the difference between card index is 1 and special case: [0 1 12] [2 3 A]
    if (cardIndex[1] - cardIndex[0] == 1  && (cardIndex[2] - cardIndex[1] == 1 || (cardIndex[1] == 1 && cardIndex[2] == 12))){
        return true
    }

    return false
}

// start the game
let CardDeck = getNewDeck();
shuffle(CardDeck);
