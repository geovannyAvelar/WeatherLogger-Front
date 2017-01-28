app.config(function($routeProvider) {
  $routeProvider
  .when("/temperature", {
    templateUrl: 'app/partials/temp-chart.html',
    controller: 'weatherController'
  })
  .when("/humidity", {
    templateUrl: 'app/partials/humidity-chart.html',
    controller: 'weatherController'
  })
  .when("/dew_point", {
    templateUrl: 'app/partials/dew-point-chart.html',
    controller: 'weatherController'
  }).otherwise("/");
});
