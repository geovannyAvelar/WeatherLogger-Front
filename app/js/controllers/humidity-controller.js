app.controller('humidityController', function($scope, $interval, WeatherService, LineChartService) {
  $scope.date = new Date();

  $interval(function() {
    var actualDay = moment(new Date()).format("MM-DD-YYYY");
    var selectedDay = moment($scope.date).format("MM-DD-YYYY");

    //If today is selected, update the chart
    if(actualDay === selectedDay) {
      $scope.drawChart();
    }

  }, 10 * 60 * 1000);

  $scope.drawChart = function() {
    $scope.loading = true;
    $scope.empty = false;

    WeatherService
      .findByDay($scope.date)
        .then(function success(weatherData) {
          if('data' in weatherData) {
            $scope.minimumHumidity = weatherData.minimumHumidity;
            $scope.maximumHumidity = weatherData.maximumHumidity;
            LineChartService.drawChart(weatherData.data, 'Humidity (%)', 'humidity',
                                       {'r': 0, 'g': 46, 'b': 255});
          } else {
            $scope.empty = true;
          }
        }, function error() {
          Materialize.toast('Cannot retrieve weather data from server', 3000);
        })
        .finally(function() {
          $scope.loading = false;
        });
  };

  $scope.drawChart();

});
