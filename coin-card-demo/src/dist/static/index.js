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


var player1Input = document.getElementById("player-1-stake-input-id");
var player1StakeButton = document.getElementById("player-1-stake-button-id");
var player2Input = document.getElementById("player-2-stake-input-id");
var player2StakeButton = document.getElementById("player-2-stake-button-id");
var resultCheckButton = document.getElementById('result-check-button-id');
player1StakeButton.addEventListener('click', function () {
  var playerStake = parseInt(player1Input.value);
  player1.coin -= playerStake;
  pot += playerStake;
  player1Input.value = '';
});
player2StakeButton.addEventListener('click', function () {
  var playerStake = parseInt(player2Input.value);
  player2.coin -= playerStake;
  pot += playerStake;
  player2Input.value = '';
});
resultCheckButton.addEventListener('click', function () {
  var winner = determineWinner();

  if (winner === player1.name) {
    player1.coin += pot;
  } else {
    player2.coin += pot;
  }

  pot = 0;
  console.log(player1);
  console.log(player2);
});
