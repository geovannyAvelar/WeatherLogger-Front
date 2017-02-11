// TODO Use DRY principle on this controller
app.controller('weatherController', function($scope, $interval, WeatherService, LineChartService) {

  $scope.maxDate = new Date();
  $scope.tempDate = new Date();
  $scope.humidityDate = new Date();
  $scope.dewPointDate = new Date();
  $scope.updateIntervalInMinutes = 5;

  //Update tabs data periodically
  $interval(function() {
    $scope.updateTabsData();
  }, $scope.updateIntervalInMinutes * 60 * 1000);

  $scope.updateGeneralData = function() {
    $scope.loading = true;

    WeatherService
      .findLast()
        .then(function success(response) {
          $scope.data = response;
          //Formatting last record date
          $scope.lastUpdate = moment($scope.data.date).utc().local().fromNow();
        }, function error() {
          Materialize.toast('Cannot retrieve weather data from server', 3000);
        })
        .finally(function() {
          $scope.loading = false;
        });
  };

  $scope.drawTemperatureChart = function() {
    $scope.loading = true;
    $scope.empty = false;

    WeatherService
      .findByDay($scope.tempDate)
        .then(function success(weatherData) {

          if('data' in weatherData) {
            $scope.tempChartDay = moment($scope.tempDate).format('dddd, MMMM Do YYYY');
            $scope.minimumTemperature = weatherData.minimumTemperature;
            $scope.maximumTemperature = weatherData.maximumTemperature;
            $scope.averageTemperature = weatherData.averageTemperature;
            LineChartService.drawChart(weatherData.data, 'Temperature (Cº)', 'temperature',
                                        {'r': 255, 'g': 165, 'b': 0});
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

  $scope.drawHumidityChart = function() {
    $scope.loading = true;
    $scope.empty = false;

    WeatherService
      .findByDay($scope.humidityDate)
        .then(function success(weatherData) {
          if('data' in weatherData) {
            $scope.humidityChartDay = moment($scope.humidityDate).format('dddd, MMMM Do YYYY');
            $scope.minimumHumidity = weatherData.minimumHumidity;
            $scope.maximumHumidity = weatherData.maximumHumidity;
            $scope.averageHumidity = weatherData.averageHumidity;
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

  $scope.drawDewPointChart = function() {
    $scope.loading = true;
    $scope.empty = false;

    WeatherService
      .findByDay($scope.dewPointDate)
        .then(function success(weatherData) {

          if('data' in weatherData) {
            $scope.dewPointChartDay = moment($scope.dewPointDate).format('dddd, MMMM Do YYYY');
            $scope.minimumDewPoint = weatherData.minimumDewPoint;
            $scope.maximumDewPoint = weatherData.maximumDewPoint;
            $scope.averageDewPoint = weatherData.averageDewPoint;
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

  $scope.updateTabsData = function() {
    $scope.updateGeneralData();
    $scope.drawTemperatureChart();
    $scope.drawHumidityChart();
    $scope.drawDewPointChart();
  };

  $scope.updateTabsData();

});
