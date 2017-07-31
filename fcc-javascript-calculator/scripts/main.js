$(document).ready(function() {
  var mathArr = [];

  //Get button click and determine which button
  $('button').on('click', function() {
    var last = mathArr[mathArr.length - 1];
    var val = $(this).attr('value');

    if ($('.display').html() === '') {
      if (!(val.match(/\d/)) && !($('#delete').hasCLass('clr'))) {
        mathArr = [];
      } else {
        mathArr.push(val);
        updateDisplay(mathArr);
      }
    } else if (val === '=') {
      mathArr = mathArr.join('');
      setClrBtn();
      $('.display').html(eval(mathArr).toPrecision(10).replace(/\.?0+$/, ""));
      mathArr = [];
      mathArr.push($('.display').html());
    } else if ($(this).hasClass('dlt')) {
      mathArr.pop();
      updateDisplay(mathArr);
    } else if (val.match(/^[\/*+-.]/) && last.match(/^[\/*+-.]/)) {
      updateDisplay(mathArr);
    } else if ($('#delete').hasClass('clr') && val === 'del') {
      if (val.match(/[\/*+-.]/) && last.match(/[\/*+-.]/)) {
        mathArr.push(val);
        updateDisplay(mathArr);
      } else if ($(this).hasClass('clr')) {
        reset();
      }
    } else {
      mathArr.push(val);
      updateDisplay(mathArr);
    }
  });

  //Change .display to reflect what is entered
  function updateDisplay(arr) {
    var display = arr.join('');
    display = display.replace(/\//g, "&divide;").replace(/\*/g, "&times;");
    $('.display').html(display);
  }

  //Change DEL to CLR after #equals is pressed
  function setClrBtn() {
    $('#delete').removeClass('dlt grey darken-1');
    $('#delete').addClass('clr green accent-2');
    $('#delete').html('CLR');
  }

  //Change CLR to DEL after CLR is pressed
  function setDelBtn() {
    $('#delete').removeClass('clr green accent-2');
    $('#delete').addClass('dlt grey darken-1');
    $('#delete').html('DEL');
  }

  //On CLR click reset display to 0 and CLR to DEL
  function reset() {
    $('.display').html('');
    mathArr = [];
    setDelBtn();
  }
});
