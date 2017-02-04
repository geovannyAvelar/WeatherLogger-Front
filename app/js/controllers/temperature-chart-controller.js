app.controller('temperatureChartController', function($scope,
                                                      WeatherService,
                                                      TemperatureChartService) {

  $scope.date = new Date();

  $scope.drawChart = function() {
    $scope.loading = true;

    WeatherService
      .findByDay($scope.date)
        .then(function success(data) {
          $scope.weatherData = TemperatureChartService.formatDataToChart(data);
          TemperatureChartService.drawChart($scope.weatherData);
          $scope.loading = false;
        }, function error() {
          Materialize.toast('Cannot retrieve weather data from server', 3000);
          $scope.loading = false;
        });
  };

  $scope.drawChart();

});
