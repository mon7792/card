"use strict";

// THE FILE CONTAINS ALL THE LOGIC FOR CLIENT SIDE.
// GAME STATE
var player1 = {
  name: "player-1-name",
  coin: 100
};
var player2 = {
  name: "player-2-name",
  coin: 100
};

function decPlayerCoin(player, coin) {
  player.coin -= coin;
}

function incPlayerCoin(player, coin) {
  player.coin += coin;
} // Game Constants


var pot = 0;
var minBet = 5;
var gameCurrentBet = 5;
var noOfPlayer = 2; // Functions.

function determineWinner() {
  if (Math.random() < 0.5) {
    return player1.name;
  }

  return player2.name;
} // ui-function
// player 1


var player1Input = document.getElementById("player-1-stake-input-id");
var player1CoinField = document.getElementById("player-1-coin-id"); // player1Button

var player1StakeButton = document.getElementById("player-1-stake-button-id");
var player1BlindButton = document.getElementById("player-1-blind-button-id");
var player1CheckButton = document.getElementById("player-1-check-button-id");
var player1RaiseButton = document.getElementById("player-1-raise-button-id");
var player1ShowButton = document.getElementById("player-1-show-button-id");
var player1FlopButton = document.getElementById("player-1-flop-button-id"); // player 2

var player2Input = document.getElementById("player-2-stake-input-id");
var player2CoinField = document.getElementById("player-2-coin-id"); // player1Button

var player2StakeButton = document.getElementById("player-2-stake-button-id");
var player2BlindButton = document.getElementById("player-2-blind-button-id");
var player2CheckButton = document.getElementById("player-2-check-button-id");
var player2RaiseButton = document.getElementById("player-2-raise-button-id");
var player2ShowButton = document.getElementById("player-2-show-button-id");
var player2FlopButton = document.getElementById("player-2-flop-button-id"); // game

var newGameButton = document.getElementById('new-game-button-id');
var resultCheckButton = document.getElementById('result-check-button-id');
var resultDisplay = document.getElementById('result-id');
var potDisplay = document.getElementById('current-pot-size-id');
/*
GAME BUTTON
*/
// newGameButton starts the new game.

newGameButton.addEventListener('click', function () {
  // disable the current button
  newGameButton.disabled = true; // enable player area

  enablePlayerArea(true); // TODO: check if the entry bet is allowed.
  // enter the player entry bet.

  decPlayerCoin(player1, minBet);
  decPlayerCoin(player2, minBet); // increment the pot

  pot = 2 * minBet; // update the board.

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
  updateDisplayPlayer2Coin(player2.coin);
  resultCheckButton.disabled = false;
}); // resultCheckButton checks the winner of the game.

resultCheckButton.addEventListener('click', function () {
  if (pot === 0) {
    return;
  } // determine winner


  var winner = determineWinner();

  if (winner === player1.name) {
    player1.coin += pot;
  } else {
    player2.coin += pot;
  }

  pot = 0; // DISPLAY

  enablePlayerArea(false);
  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
  updateDisplayPlayer2Coin(player2.coin);
  updateDisplayResult(winner);
  newGameButton.disabled = false;
  resultCheckButton.disabled = true;
});
/*
PLAYER BUTTON
*/
// player 1
// player1StakeButton add the player 1 stake to the Pot

player1StakeButton.addEventListener('click', function () {
  var playerInput = player1Input.value.trim();

  if (playerInput === "") {
    return;
  }

  var playerStake = parseInt(playerInput); // decrement player coin

  player1.coin -= playerStake;
  player1Input.value = ''; // update the pot

  pot += playerStake; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
}); // player1BlindButton add the blind

player1BlindButton.addEventListener('click', function () {
  // player 1 Bind
  player1.coin -= minBet; // update pot.

  pot += minBet; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
  console.log("PLAYER 1 BLIND");
});
player1CheckButton.addEventListener('click', function () {
  // player 1 Bind
  player1.coin -= 2 * gameCurrentBet; // update pot.

  pot += 2 * gameCurrentBet; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
  console.log("PLAYER 1 CHECK");
});
player1RaiseButton.addEventListener('click', function () {
  // TODO: check if the raise is allowed
  var playerInput = player1Input.value.trim();

  if (playerInput === "") {
    return;
  }

  var playerStake = parseInt(playerInput); // decrement player coin

  player1.coin -= playerStake;
  player1Input.value = ''; // update the pot

  pot += playerStake; //  update game minbet

  gameCurrentBet = playerStake; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
  console.log("PLAYER 1 RAISE");
});
player1ShowButton.addEventListener('click', function () {
  // TODO: check if the SHOW is allowed
  // player 1 Bind
  player1.coin -= 2 * gameCurrentBet; // update pot.

  pot += 2 * gameCurrentBet; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
  console.log("PLAYER 1 SHOW");
});
player1FlopButton.addEventListener('click', function () {
  console.log(" PLAYER 1 FLOP");
}); //  player 2
// player2StakeButton add the player 2 stake to the Pot

player2StakeButton.addEventListener('click', function () {
  var playerInput = player2Input.value.trim();

  if (playerInput === "") {
    return;
  }

  var playerStake = parseInt(playerInput); // decrement player coin

  player2.coin -= playerStake;
  player2Input.value = ''; // update the pot

  pot += playerStake; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer2Coin(player2.coin);
}); // player1BlindButton add the blind

player2BlindButton.addEventListener('click', function () {
  // player 2 Bind
  player2.coin -= minBet; // update pot.

  pot += minBet; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer2Coin(player2.coin);
  console.log("PLAYER 2 BLIND");
});
player2CheckButton.addEventListener('click', function () {
  // player 2
  player2.coin -= 2 * gameCurrentBet; // update pot.

  pot += 2 * gameCurrentBet; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer2Coin(player2.coin);
  console.log("PLAYER 2 CHECK");
});
player2RaiseButton.addEventListener('click', function () {
  // TODO: check if the raise is allowed
  var playerInput = player2Input.value.trim();

  if (playerInput === "") {
    return;
  }

  var playerStake = parseInt(playerInput); // decrement player coin

  player2.coin -= playerStake;
  player2Input.value = ''; // update the pot

  pot += playerStake; //  update game minbet

  gameCurrentBet = playerStake; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer2Coin(player2.coin);
  console.log("PLAYER 2 RAISE");
});
player2ShowButton.addEventListener('click', function () {
  // TODO: check if the SHOW is allowed
  // player 1 Bind
  player2.coin -= 2 * gameCurrentBet; // update pot.

  pot += 2 * gameCurrentBet; // display

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer2Coin(player2.coin);
  console.log("PLAYER 2 SHOW");
});
player2FlopButton.addEventListener('click', function () {
  console.log(" PLAYER 2 FLOP");
}); // function

function updateDisplayCurrentPot(coin) {
  potDisplay.innerHTML = coin.toString();
}

function updateDisplayPlayer1Coin(coin1) {
  player1CoinField.innerHTML = coin1.toString();
}

function updateDisplayPlayer2Coin(coin2) {
  player2CoinField.innerHTML = coin2.toString();
}

function updateDisplayResult(playerName) {
  resultDisplay.innerText = "".concat(playerName, " won the session.");
}

function enablePlayerArea(enable) {
  // player 1
  player1Input.disabled = !enable;
  player1StakeButton.disabled = !enable;
  player1BlindButton.disabled = !enable;
  player1CheckButton.disabled = !enable;
  player1RaiseButton.disabled = !enable;
  player1ShowButton.disabled = !enable;
  player1FlopButton.disabled = !enable; // player 2

  player2Input.disabled = !enable;
  player2StakeButton.disabled = !enable;
  player2BlindButton.disabled = !enable;
  player2CheckButton.disabled = !enable;
  player2RaiseButton.disabled = !enable;
  player2ShowButton.disabled = !enable;
  player2FlopButton.disabled = !enable;
}

window.onload = function () {
  console.log("WINDOW LOADED"); // INITIAL BOARD DISPLAY

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
  updateDisplayPlayer2Coin(player2.coin);
  enablePlayerArea(false);
  resultCheckButton.disabled = true;
};
