app.controller('generalController', function($scope, $interval, WeatherService) {

  $scope.updateData = function() {
    $scope.loading = true;

    WeatherService
      .findLast()
        .then(function success(response) {
          $scope.data = response;
          $scope.lastUpdate = moment($scope.data.date).utc().local().fromNow();
        }, function error() {
          Materialize.toast('Cannot retrieve weather data from server', 3000);
        })
        .finally(function() {
          $scope.loading = false;
        });
  };

  $scope.updateData();

});
