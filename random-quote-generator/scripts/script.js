
$(document).ready(function(){
  $('.btn').on('click', function(){
    newQuote();
  });

  function newQuote(){
    $.ajax({
      url: 'http://api.forismatic.com/api/1.0/',
      jsonp: 'jsonp',
      dataType: 'jsonp',
      cache: 'false',
      data: {
        method: 'getQuote',
        format: 'jsonp',
        lang: 'en'
      },
      success: function(result){
        $('#message').text(result.quoteText);
        if (result.quoteAuthor !== "") {
          $('#author').text('- ' + result.quoteAuthor);
        } else {
          $('#author').text('- Unknown');
        }
        // $('#author').text("-" + result.quoteAuthor);
      }
    });
  }
  newQuote();
});
