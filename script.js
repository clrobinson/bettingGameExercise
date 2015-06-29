// Player Definition
var player = {
  money: 100
}

// Game Functions

var offByOne = function(num, checkNum) {
  return ( ( checkNum === (num - 1) ) || ( checkNum === (num + 1) ) );
}

var gameRound = function(playerGuess) {
  var numToGuess = Math.floor((Math.random() * 10) + 1);
  if (playerGuess === numToGuess) {
    return 2;
  }
  else if ( offByOne(numToGuess, playerGuess) ) {
    return 1;
  }
  else {
    return 0;
  }
}

var checkBet = function(betNum) {
  if (betNum == false) {return false;}
  if (betNum > player.money) {return false;}
  var min = 5;
  var max = 10;
  return ( (betNum >= min) && (betNum <= max) );
}

var getBet = function() {
  var bet;
  var promptString = "Please place your bet (between $5 and $10). Enter a number only. You currently have $" + player.money;
  while (checkBet(bet) === false) {
    result = prompt(promptString);
    bet = parseInt(result);
    if ( checkBet(bet) === false ) {
      alert("That is not a valid bet.");
    }
  }
  return bet;
}

var checkGuess = function(guessNum) {
  if (guessNum == false) {return false;}
  var min = 1;
  var max = 10;
  return ( (guessNum >= min) && (guessNum <= max) );
}

var getGuess = function() {
  var guess;
  while (checkGuess(guess) === false ) {
    guess = parseInt( prompt("Please enter your guess: (1 to 10)") );
    if ( checkGuess(guess) === false ) {
      alert("That is not a valid guess.")
    }
  }
  return guess;
}

var processGameResult = function(bet, betMultiplier) {
  var prize = bet * betMultiplier;
  player.money += prize;
  var promptString = null;
  if (betMultiplier === 0) { promptString = "Wrong! You lose!"; }
  else if (betMultiplier === 1) { promptString = "Off by one. You get your money back."; }
  else if (betMultiplier === 2) { promptString = "Right! You win!"; }
  promptString += ( " You now have $" + player.money + "." );
  alert(promptString);
}

// Main Game Processing
var wantsToPlay = true;
var bet = null;
var guess = null;
var betMultiplier = null;

while ( (player.money > 5) && (wantsToPlay === true) ) {
  bet = getBet();
  player.money -= bet;
  guess = getGuess();
  betMultiplier = gameRound(guess);
  processGameResult(bet, betMultiplier);
  wantsToPlay = confirm("Keep playing?");
}
