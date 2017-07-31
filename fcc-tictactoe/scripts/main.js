$(document).ready(function() {
  var position = 0;
  var playerOneMoves = [];
  var playerTwoMoves = [];
  var currentPlayerMoves = [];
  var currentPlayer = '';
  var playerTwo = '';
  var validMove = true;
  var gameWon = false;

  function computerPlay() {
    for (var i = 0; i < 9; i++) {
      var randomNumber = Math.floor(Math.random() * 9);
      var randomSquare = $('#' + randomNumber);
      validateMove(randomSquare);
      if (gameWon === false && validMove === true ) {
        break;
      }
    }
    randomSquare.removeClass('empty');
    randomSquare.removeClass('square');
    randomSquare.addClass('taken');
    randomSquare.html(currentPlayer);
    position = parseInt(randomSquare.id);
    currentPlayerMoves.push(position);
    checkWinConditions();
    checkDraw();
    nextPlayer();
  }

  function validateMove(move) {
    if ($(move).hasClass('empty')) {
      validMove = true;
    } else {
      validMove = false;
      return false;
    }
  }

  function checkWinConditions() {
    var winArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (i = 0; i < winArr.length; i++) {
      var check = winArr[i].every(function(val) {
        return currentPlayerMoves.indexOf(val) >= 0;
      });
      if (check === true) {
        gameWon = true;
        $('table').css('display', 'none');
        $('#win').fadeIn(500).html('Player ' + currentPlayer + ' wins!');
        setTimeout(function(){
          reset();
        }, 3000);
      }
    }
  }

  function checkDraw() {
    if (!($('td').hasClass('empty'))) {
      $('table').css('display', 'none');
      $('#draw').fadeIn(500).html('The game is a draw...');
      setTimeout(function(){
        reset();
      }, 3000);
    }
  }

  function nextPlayer() {
    $('#message p').html(' ');
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
      playerOneMoves = currentPlayerMoves;
      currentPlayerMoves = playerTwoMoves;
    } else {
      currentPlayer = 'X';
      playerTwoMoves = currentPlayerMoves;
      currentPlayerMoves = playerOneMoves;
    }
  }

  function reset() {
    gameWon = false;
    playerOneMoves = [];
    playerTwoMoves = [];
    currentPlayerMoves = [];
    $('#win').css('display', 'none');
    $('#draw').css('display', 'none');
    $('td').addClass('empty');
    $('td').addClass('square');
    $('td').removeClass('taken');
    $('td').html('');
    $('table').css('display', 'block');
  }

  $('#x').on('click', function() {
    currentPlayer = 'X';
    $('.choice').css('display', 'none');
    $('table').fadeIn(500);
  });

  $('#o').on('click', function() {
    currentPlayer = 'O';
    $('.choice').css('display', 'none');
    $('table').fadeIn(500);
  });

  $('.one').on('click', function() {
    $('#choice').toggle();
    currentPlayerMoves = playerOneMoves;
    playerTwo = 'computer';
    $('.player-number').css('display', 'none');
    $('.choice').fadeIn(500);
  });

  $('.two').on('click', function() {
    $('#choice').toggle();
    currentPlayerMoves = playerOneMoves;
    playerTwo = 'human';
    $('.player-number').css('display', 'none');
    $('.choice').fadeIn(500);
  });

  $('.square').on('click', function() {
    validateMove(this);
    if (validMove) {
      $(this).removeClass('empty');
      $(this).removeClass('square');
      $(this).addClass('taken');
      $(this).html(currentPlayer);
      position = parseInt(this.id);
      currentPlayerMoves.push(position);
      checkWinConditions();
      checkDraw();
      if (playerTwo === 'computer') {
        nextPlayer();
        computerPlay();
      } else {
        nextPlayer();
      }
    }
  });

});
