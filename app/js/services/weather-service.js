app.service('WeatherService', function($http, BASE_URL) {
  var weatherService = {};

  weatherService.findByDay = function(day) {
    return $http({
      method: "GET",
      url: BASE_URL + '/weather/day/' + moment(day).format("YYYY-MM-DD")
    })
    .then(function success(response) {
      return response.data;
    }, function error() {
      return {};
    });
  };

  weatherService.findByPeriod = function(start, end) {
    return $http({
      method: "GET",
      url: BASE_URL + "/weather/period/" + start + "/"  + end
    })
    .then(function success(response) {
      return response.data;
    }, function error() {
      return {};
    });
  };

  return weatherService;

});
