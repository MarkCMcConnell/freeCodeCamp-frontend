$(document).ready(function() {

  $('.search').submit(function() {

    var search = $('#query').val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + search + "&format=json&callback=?";

    $('.links').remove();

    $.ajax( {
      url: url,
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function(data, status, jqXHR) {
        console.log(data);
        $('h1').css("margin-top", "2%");
        for (var i = 0; i < data[1].length; i++) {
          $('#link-list').prepend('<div class="links"><a href="' + data[3][i] + 'target="blank"><h3>' + data[1][i] + '</h3><p>' + data[2][i] + '</p></a></div>');
        }
      },
      error: function(errorMessage){
        alert("Error!");
      }
    });
  });

  $('.random').click(function() {
    window.location = "https://en.wikipedia.org/wiki/Special:Random";
  });

  $('.reset').click(function() {
    $('.links').remove();
    $('#query').val('');
    $('h1').css("margin-top", "20%");
  });

});
