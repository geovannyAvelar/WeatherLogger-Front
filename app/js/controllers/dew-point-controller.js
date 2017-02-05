app.controller('dewPointController', function($scope, $interval, WeatherService, LineChartService) {
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
            $scope.minimumDewPoint = weatherData.minimumDewPoint;
            $scope.maximumDewPoint = weatherData.maximumDewPoint;
            LineChartService.drawChart(weatherData.data, 'Dew point (Cº)', 'dewPoint',
                                        {'r': 0, 'g': 160, 'b': 10});
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
