$(document).ready( function() {

  // Variable Instantiation
  var player = {
    money: 100
  }
  var bet = null;
  var guess = null;
  var betMultiplier = null;
  var numToGuess = null;
  var gameResult = null;

  // Game Functions
  var offByOne = function(num, checkNum) {
    return ( ( checkNum === (num - 1) ) || ( checkNum === (num + 1) ) );
  }

  var gameRound = function(playerGuess) {
    numToGuess = Math.floor((Math.random() * 10) + 1);
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

  var processGameResult = function(bet, betMultiplier) {
    var prize = bet * betMultiplier;
    player.money += prize;
    gameResult = "";
    gameResult += "The number you were to guess was " + numToGuess + ". ";
    if (betMultiplier === 0) { gameResult += "Wrong! You lose! "; }
    else if (betMultiplier === 1) { gameResult += "Off by one. You get your money back. "; }
    else if (betMultiplier === 2) { gameResult += "Right! You win double what you bet! "; }
  }

  // Define update method and update the player's money display
  var updateMoneyText = function() {
    $("#money-value").text(player.money);
  }
  updateMoneyText();

  // OnClick
  $("#submit").on('click', function() {
    if ( player.money > 5 ) {
      bet = parseInt( $("#bet").val() );
      player.money -= bet;
      guess = parseInt( $("#guess").val() );
      betMultiplier = gameRound(guess);
      processGameResult(bet, betMultiplier);
    }
    else {
      gameResult = "Not enough points to play again!";
    }
    $("#game-results").text(gameResult);
    updateMoneyText();
  });

});
