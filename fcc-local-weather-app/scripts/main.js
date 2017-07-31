$(document).ready(function() {

  var lat = 0;
  var lon = 0;
  var city = "";
  var windCalc = "mp/h";
  var units = "imperial";
  var tempMeasure = "°F";

  function postData(units) {
    var apiKey = '&APPID=3793c8053de03310a7cc9e5dc8f71480';
    var api = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=' + units + apiKey

    getLocation();
    $.getJSON(api, function(result) {
      var temp = roundDown(result.main.temp);
      var wind = roundDown(result.wind.speed);
      var weather = result.weather[0].description;
      var conditions = result.weather[0].id;
      var date = convertDate(result.dt);
      var time = convertTime(result.dt);
      var hours = convertHours(result.dt);
      var bearing = roundDown(result.wind.deg);
      var humidity = result.main.humidity;
      var barometer = roundDown(result.main.pressure);

      bearing = windDirection(bearing);
      weatherCondition(conditions, hours);

      $('#location').html('<h2>' + city + '</h2>');
      $('#weather').html('<h4>' + weather + '</h4>');
      $('#temp').html('<h3><i class="wi wi-thermometer"></i> ' + temp + ' ' + tempMeasure + '</h3>');
      $('#wind').html('<h5>' + wind + ' ' + windCalc + ' ' + bearing + '</h5>');
      $('#time').html('<h5>' + time + '</h5>');
      $('#date').html('<h5>' + date + '</h5>');
      $('#humidity').html('<h5><i class="wi wi-humidity"></i> ' + humidity + '</h5>');
      $('#barometer').html('<h5><i class="wi wi-barometer"></i> ' + barometer + '</h5>');
    });
  }

  function getLocation() {
    $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
      lat = data.lat;
      lon = data.lon;
      city = data.city;
    });
  }

  function weatherCondition(code, hours) {
    if (hours >= 6 && hours <= 18) {
      switch (true) {
        case (code >= 200 && code <= 232):
          $('#weather-icon').html('<i class="wi wi-day-storm-showers"></i>');
          break;
        case ((code >= 300 && code <= 321) || (code >= 520 && code <= 531)):
          $('#weather-icon').html('<i class="wi wi-day-rain-mix"></i>');
          break;
        case (code >= 500 && code <= 504):
          $('#weather-icon').html('<i class="wi wi-day-rain"></i>');
          break;
        case ((code >= 600 && code <= 622) || code === 511):
          $('#weather-icon').html('<i class="wi wi-day-snow"></i>');
          break;
        case (code === 800):
          $('#weather-icon').html('<i class="wi wi-sunny"></i>');
          break;
        case (code === 801):
          $('#weather-icon').html('<i class="wi wi-day-cloudy-high"></i>');
          break;
        case (code === 802):
          $('#weather-icon').html('<i class="wi wi-day-cloudy-high"></i>');
          break;
        case (code === 803 || code === 804):
          $('#weather-icon').html('<i class="wi wi-sunny-overcast"></i>');
          break;
      }
    } else if ((hours > 18 && hours <= 23) || (hours >= 0 && hours < 6)) {
      switch (true) {
        case (code >= 200 && code <= 232):
          $('#weather-icon').html('<i class="wi wi-night-alt-storm-showers"></i>');
          break;
        case ((code >= 300 && code <= 321) || (code >= 520 && code <= 531)):
          $('#weather-icon').html('<i class="wi wi-night-alt-rain-mix"></i>');
          break;
        case (code >= 500 && code <= 504):
          $('#weather-icon').html('<i class="wi wi-night-alt-rain"></i>');
          break;
        case ((code >= 600 && code <= 622) || code === 511):
          $('#weather-icon').html('<i class="wi wi-night-alt-snow"></i>');
          break;
        case (code === 800):
          $('#weather-icon').html('<i class="wi wi-night-clear"></i>');
          break;
        case (code === 801):
          $('#weather-icon').html('<i class="wi wi-night-cloud-high"></i>');
          break;
        case (code === 802):
          $('#weather-icon').html('<i class="wi wi-night-cloud-high"></i>');
          break;
        case (code === 803 || code === 804):
          $('#weather-icon').html('<i class="wi wi-night-alt-partly-cloudy"></i>');
          break;
      }
    }
  }

  function windDirection(degrees) {
    switch (true) {
      case (degrees >= 337 || degrees <= 21):
        return "N";
        break;
      case (degrees >= 22 || degrees <= 66):
        return "NE";
        break;
      case (degrees >= 67 || degrees <= 111):
        return "NE";
        break;
      case (degrees >= 112 || degrees <= 156):
        return "SE";
        break;
      case (degrees >= 157 || degrees <= 201):
        return "S";
        break;
      case (degrees >= 202 || degrees <= 246):
        return "SW";
        break;
      case (degrees >= 247 || degrees <= 291):
        return "W";
        break;
      case (degrees >= 292 || degrees <= 336):
        return "NW";
        break;
    }
  }

  function convertTime(num) {
    var time = new Date(num * 1000);
    return time.toLocaleTimeString();
  }

  function convertDate(num) {
    var date = new Date(num * 1000);
    return date.toLocaleDateString();
  }

  function convertHours(num) {
    var hours = new Date(num * 1000);
    return hours.getHours();
  }

  function roundDown(num) {
    return Math.round(num);
  }

  function init() {
    postData(units);
  }

  init();

  $('.celsius').click(function() {
    units = "metric";
    windCalc = "kph";
    tempMeasure = '<i class="wi wi-celsius"></i>';
    postData(units);
  });

  $('.fahrenheit').click(function() {
    units = "imperial";
    windCalc = "mph";
    tempMeasure = '<i class="wi wi-fahrenheit"></i>';
    postData(units);
  });
  //bakcround image adjustment
  body.style.filter = 'opacity(50%)';

});
