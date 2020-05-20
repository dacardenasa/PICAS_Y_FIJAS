'use strict'

var numberCorrect, picas, fijas;
var numbersVal = []; 

// Function to load number and init vars for a new game 
var loadGame = function(){
  // Function to generate  number
  var generateNumber = function(){
    var arrNumber = [0,1,2,3,4,5,6,7,8,9];
    var numbersGame = [];
  
    for (let i = 0; i < 4; i++) {
      numbersGame.push(arrNumber[Math.round(Math.random() * 9)]);
    }
    return numbersGame;
  };
  
  // Function  to check if generated number has repeated numbers
  var checkNumber = function(){
    // Save generated number
    numbersVal = generateNumber();
    // Var to save number of times each number is repeat into numbersVal var
    var contadorNumber = [];
    // array to match if number has repeat numbers [1,1,1,1] => false
    var matchArray = [1, 1, 1, 1];
    // Counter to save times number repeat a number into numbersVal var
    var count = 0;
    
    for (let i = 0; i < numbersVal.length; i++) {
      for (let j = 0; j < numbersVal.length; j++) {
        if (numbersVal[i] === numbersVal[j]) {
          count++;
        }
      }
      contadorNumber.push(count);
      count = 0;
    }
  
    for (let i = 0; i < contadorNumber.length; i++) {
      for (let j = 0; j < matchArray.length; j++) {
        if ( contadorNumber[i] !== matchArray[j] ) {
          return true;
        }
      }
    }
    return false;
  };

  // do while to control checknumber function return a number which has no repeat numbers 
  
  do {
  checkNumber();
  } while ( checkNumber() );
  
  // init vars
  numberCorrect = numbersVal.join("");
  picas = 0;
  fijas = 0;
}

// Init user game
var startGame = function(input){

  for (let i = 0; i < numberCorrect.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (numberCorrect[i] === input[j] && i === j) {
        fijas++;
      } else if (numberCorrect[i] === input[j]) {
        picas++;
      }
    }
  }

  var template = Handlebars.compile($('#rows-template').html());

  var row = {  numero: input, picas: picas, fijas: fijas };

  $('table tbody').prepend(template(row));

  if ( fijas === 4 ) {
    $('.win').show();
  } else {
    picas = 0;
    fijas = 0;
  }

}

$(document).ready(function(){
  
  loadGame();

  $('#number').on('keypress', function(e){
    if (e.which === 13) {
      if  ( $(this).val().length === 0 || $(this).val().length !== 4 || !$(this).val().match(/[0-9]/)) {
        $('.titulo p span').addClass('text-error');
      } else {
        $('.titulo p span').removeAttr('class');
        startGame($(this).val());
      }
    }
  });

  $('#newGame').bind('click', function(){
    $('.win').css('display', 'none');
    $('table tbody').children().remove();
    $('#number').val("");
    loadGame();
  });

});





