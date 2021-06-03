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
var pot = 0; // Functions.

function determineWinner() {
  if (Math.random() < 0.5) {
    return player1.name;
  }

  return player2.name;
} // ui-function
// player 1


var player1Input = document.getElementById("player-1-stake-input-id");
var player1StakeButton = document.getElementById("player-1-stake-button-id");
var player1CoinField = document.getElementById("player-1-coin-id"); // player 2

var player2Input = document.getElementById("player-2-stake-input-id");
var player2StakeButton = document.getElementById("player-2-stake-button-id");
var player2CoinField = document.getElementById("player-2-coin-id"); // game

var newGameButton = document.getElementById('new-game-button-id');
var resultCheckButton = document.getElementById('result-check-button-id');
var resultDisplay = document.getElementById('result-id');
var potDisplay = document.getElementById('current-pot-size-id'); // newGameButton starts the new game.

newGameButton.addEventListener('click', function () {
  // disable the current button
  newGameButton.disabled = true; // enable player area

  enablePlayerArea(true);
  resultCheckButton.disabled = false;
});
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
});
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
});
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
  player1Input.disabled = !enable;
  player1StakeButton.disabled = !enable;
  player2Input.disabled = !enable;
  player2StakeButton.disabled = !enable;
}

window.onload = function () {
  console.log("WINDOW LOADED"); // INITIAL BOARD DISPLAY

  updateDisplayCurrentPot(pot);
  updateDisplayPlayer1Coin(player1.coin);
  updateDisplayPlayer2Coin(player2.coin);
  enablePlayerArea(false);
  resultCheckButton.disabled = true;
};
