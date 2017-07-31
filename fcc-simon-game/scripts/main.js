var playerArr = [];
var computerArr = [];
var computerPlayedArr = [];
var gameStyle = '';
var counter = 1;
var count = 0;

$(document).ready(function() {

  function randomComputerArr() {
    for(var i = 0; i < 20; i++) {
      computerArr[i] = Math.ceil(Math.random() * 4);
    }
    console.log(computerArr);
  }

  function computerTurn() {
    var interval = setInterval(function() {
      if (computerArr[count] === 1) {
        computerPlayedArr.push(1);
        highlightButton(1);
      } else if (computerArr[count] === 2) {
        computerPlayedArr.push(2);
        highlightButton(2);
      } else if (computerArr[count] ===3) {
        computerPlayedArr.push(3);
        highlightButton(3);
      } else {
        computerPlayedArr.push(4);
        highlightButton(4);
      }
      count++;
      if (count >= counter) {
        clearInterval(interval);
      }
    }, 600);

  }

  function highlightButton(color) {
    var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

    switch (color) {
      case 1:
        $('.green').addClass('highlight-green');
        greenSound.play();
        setTimeout(function() {
          $('.green').removeClass('highlight-green');
          $('.green').addClass('normal-green');
        }, 300);
        break;
      case 2:
        $('.red').addClass('highlight-red');
        redSound.play();
        setTimeout(function() {
          $('.red').removeClass('highlight-red');
          $('.red').addClass('normal-red');
        }, 300);
        break;
      case 3:
        $('.yellow').addClass('highlight-yellow');
        yellowSound.play();
        setTimeout(function() {
          $('.yellow').removeClass('highlight-yellow');
          $('.yellow').addClass('normal-yellow');
        }, 300);
        break;
      case 4:
        $('.blue').addClass('highlight-blue');
        blueSound.play();
        setTimeout(function() {
          $('.blue').removeClass('highlight-blue');
          $('.blue').addClass('normal-blue');
        }, 300);
        break;
      default:
        break;
    }
  }

  function compareArrayIndex(player, computer) {
    if (player === computer) {
      checkWin();
    } else {
      setTimeout(function() {
        $('#count').text('!!');
      }, 1000);
    }
  }

  function checkWin() {
    if (counter === 20 && playerArr === computerArr) {
      setTmeout(function() {
        alert('You Win!!');
        location.reload();
      }, 1000);
    } else {
      setTimeout(function() {
        counter++;
        $('#count').text(counter);
        computerPlayedArr = [];
        playerArr = [];
        computerTurn();
      }, 1000);
    }
  }

  $('.start').on('click', function() {
    $('#count').text(counter);
    randomComputerArr();
    computerTurn();
  });

  $('.green').on('click', function() {
    playerArr.push(1);
    highlightButton(1);
    compareArrayIndex(playerArr[counter - 1], computerArr[counter - 1]);
  });

  $('.red').on('click', function() {
    playerArr.push(2);
    highlightButton(2);
    compareArrayIndex(playerArr[counter - 1], computerArr[counter - 1]);
  });

  $('.yellow').on('click', function() {
    playerArr.push(3);
    highlightButton(3);
    compareArrayIndex(playerArr[counter - 1], computerArr[counter - 1]);
  });

  $('.blue').on('click', function() {
    playerArr.push(4);
    highlightButton(4);
    compareArrayIndex(playerArr[counter - 1], computerArr[counter - 1]);
  });


  $('.strict').on('click', function() {
    gameStyle = 'strict';
  });

  $('#reset').on('click', function() {
    location.reload();
  });

});
