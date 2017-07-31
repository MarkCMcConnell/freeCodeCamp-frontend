$(document).ready(function() {

  function postInfo(stream) {

    var game = '';
    var url = 'https://wind-bow.glitch.me/twitch-api/streams/' + stream + '?callback=?';
    var status = '';
    var channelImg = '';
    var displayName = '';
    var streamUrl = 'https://www.twitch.tv/' + stream;
    var streamStatus = '';

    $.getJSON(url, function(result) {

      if (result.stream === null) {
        game = 'Offline';
        channelImg = 'https://cdn-images-1.medium.com/max/800/0*rvMCTk4qDpV4AOI0.png';
        status = 'Stream is currently offline';
        displayName = stream;
        streamStatus = 'off';
      } else if (result.stream === undefined) {
        status = 'Account closed';
        streamStatus = 'off';
      } else {
        channelImg = result.stream.preview.medium;
        displayName = result.stream.channel.display_name;
        status = result.stream.channel.status;
        streamStatus = 'on';
      }
      makeCard(game, channelImg, status, displayName, streamUrl, streamStatus);
    });

  }

  function makeCard(game, img, status, name, url, streamStatus) {
    $('.streams-row').append('<div  class="' + streamStatus + ' stream col-xs-12 col-sm-6 col-md-3"><div class="wrapper"><div class="thumbnail card"><a href="https://www.twitch.tv" target="blank" alt="Twitch"><img src="' +
      img + '" alt="preview" class="img-responsive"></a><div class="caption"><a href="' +
      url + '" target="blank" alt="' + name + ' stream"><h4>' +
      name + '</h4></a><p>' + status + '</p></div></div></div></div>');
  }

  function init() {
    var streamId = ["freeCodeCamp", "CohhCarnage", "GassyMexican", "summit1g", "MANvsGAME", "Tangent", "Monstercat", "brunofin"];

    for (var i = 0; i < streamId.length; i++) {
      postInfo(streamId[i]);
    }

  }

  init();

  $('#all').on('click', function(){
    // $('.streams').remove();
    // init();
    $('#all').addClass('active');
    $('#offline').removeClass('active');
    $('#online').removeClass('active');
    $('.off').removeClass('hidden');
    $('.on').removeClass('hidden');
  });

  $('#online').on('click', function(){
    $('#online').addClass('active');
    $('#all').removeClass('active');
    $('#offline').removeClass('active');
    $('.on').removeClass('hidden');
    $('.off').addClass('hidden');
  });

  $('#offline').on('click', function(){
    $('#offline').addClass('active');
    $('#all').removeClass('active');
    $('#online').removeClass('active');
    $('.on').addClass('hidden');
    $('.off').removeClass('hidden');
  });



});
