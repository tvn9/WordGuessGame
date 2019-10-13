
// Array of Word Options (all lowercase)
var wordsArr = [
   "mirian",
   "dave",
   "dimple",
   "shelby",
   "monica",
   "ricky",
   "matt",
   "shipra",
   "krishna",
   "yimeng",
   "sree",
   "brandon",
   "chrisn",
   "chrish",
   "eastern",
   "erica",
   "katia",
   "keith",
   "laura",
   "leticia"
];
// Solution will be held here.
var randomWord = "";
// This will break the solution into individual letters to be stored in array.
var charFromRandomWord = [];
// This will be the number of blanks we show based on the solution
var underScoreNo = 0;
// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var winLossMixArr = [];
// Holds all of the wrong guesses
var unMatchGuesses = [];

// Game counters
var winCounter = 0;
var lossCounter = 0;
var trialLeft = 9;

// Start new game here
function startTheGame() {
   // Reset the guesses back to 0.
   trialLeft = 9;

   // Sellect a random array index, then store the word in randomWord veriable.
   randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
   // Separate letters in a word found from random array 
   charFromRandomWord = randomWord.split("");
   // Store the word lenght in numb
   underScoreNo = charFromRandomWord.length;

   // Print randome word to console for testing purpose.
   console.log(randomWord);

   // Reset Array win loss mix array for every new game.
   winLossMixArr = [];
   // Reset unMatchGuesses array for every new game.
   unMatchGuesses = [];

   // Insert number of underscore in the winLossMixArr.
   for (var i = 0; i < underScoreNo; i++) {
      winLossMixArr.push("_");
   }

   // Display the initial blanks in console.
   console.log(winLossMixArr);

   // Display trial left count
   document.getElementById("trial-left").innerHTML = trialLeft;

   // Display the empty string at start of each game.
   document.getElementById("word-guesses").innerHTML = winLossMixArr.join(
      " "
   );

   // Reset the wrong guesses from HTML id "wrong-word"
   document.getElementById("wrong-word").innerHTML = unMatchGuesses.join(" ");
}

// Check for matching letter function.
function compareLetters(char) {
   var charFromWord = false;

   // Test if letter entered match letter from random array index.
   for (var i = 0; i < underScoreNo; i++) {
      if (randomWord[i] === char) {
         // return true of letter matched.
         charFromWord = true;
      }
   }

   if (charFromWord) {
      // Loop through the word.
      for (var j = 0; j < underScoreNo; j++) {
         // Insert the winLossMixArr with every letter.
         if (randomWord[j] === char) {
            // Assign letter to winLossMixArr.
            winLossMixArr[j] = char;
         }
      }
      // print to console for testing.
      console.log(winLossMixArr);
   }
   // If there is no match than, insert the letter to unMatchGuesses list.
   else {
      unMatchGuesses.push(char);
      trialLeft--;
   }
}

// Run this function to track all wins and losses values and print to html.
function dataUpdating() {
   // Print data to console for testing.
   console.log(
      "WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + trialLeft);

   // Print trial-left, word-guesses, wins, losses to HTML
   document.getElementById("trial-left").innerHTML = trialLeft;
   // Print every entered letter to HTML
   document.getElementById("word-guesses").innerHTML = winLossMixArr.join(
      " "
   );
   // Print unMatchGuesses to HTML
   document.getElementById("wrong-word").innerHTML = unMatchGuesses.join(" ");

   // Alert Congratulation, You won! if all letters match.
   if (charFromRandomWord.toString() === winLossMixArr.toString()) {

      winCounter++;
      alert("Congratulation, You won!");

      // Print wins counter to HTML
      document.getElementById("correct").innerHTML = winCounter;
      startTheGame();
   }

   // If user run out trail, Alert Game over message.
   else if (trialLeft === 0) {
      // Increase loss counter
      lossCounter++;

      alert("Game Over My Friend!");

      // Print loss counter value to HTML.
      document.getElementById("incorrect").innerHTML = lossCounter;
      // Restart the game.
      startTheGame();
   }
}

// Run the game
startTheGame();

// listen to keypress then record the key value.
document.onkeyup = function (e) {
   // Convert key to string and to lower case.
   var charEntered = String.fromCharCode(e.which).toLowerCase();
   // Call 
   compareLetters(charEntered);
   // Runs the code after each round is done.
   dataUpdating();
};