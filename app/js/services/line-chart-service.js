app.service('LineChartService', function() {
  var temperatureChartService = {};
  var contexts = {
                  temperature: document.getElementById('tempChart').getContext("2d"),
                  humidity: document.getElementById('humidityChart').getContext("2d"),
                  dewPoint: document.getElementById('dewPointChart').getContext("2d")
                };
  var charts = {
                temperature: null,
                humidity: null,
                dewPoint: null
               };

  temperatureChartService.drawChart = function(weatherData, title, chartName, color) {
    var chartData = formatDataToChart(weatherData);
    var chartConfig = setChartConfig({
                                      'labels': chartData.dates,
                                      'title': title,
                                      'color': color,
                                      'data': chartData[chartName]
                                    });
    initializeCharts(chartName, chartConfig);
  };

  var initializeCharts = function(chartName, config) {
    if(charts[chartName] !== null) {
      charts[chartName].destroy();
    }

    charts[chartName] = new Chart(contexts[chartName], {type: 'line', data: config});
  };

  // Transform server JSON in a formatted data to charts
  var formatDataToChart = function(weatherData) {
    var formattedData = {dates: [], temperature: [], humidity: [], dewPoint: []};

    for(var i in weatherData) {
      formattedData.dates.push(moment(weatherData[i].date).utc().local().format("DD/MM HH:mm"));
      formattedData.temperature.push(weatherData[i].temperature);
      formattedData.humidity.push(weatherData[i].relativeHumidity);
      formattedData.dewPoint.push(weatherData[i].dewPoint);
    }

    return formattedData;
  };

  var setChartConfig = function(chartConfig) {
    var color = formatColor(chartConfig.color);

    return {
          labels: chartConfig.labels,
          datasets: [{
              label: chartConfig.title,
              fill: true,
              backgroundColor: color + ", 0.4)",
              borderColor: color + ", 1)",
              pointBorderColor: color + ", 1)",
              pointHoverBackgroundColor: color + ", 1)",
              pointHoverBorderColor: color + ", 1)",
              data: chartConfig.data
          }]
        };
  };

  var formatColor = function(rgbJson) {
    return "rgba(" + rgbJson.r + ", " + rgbJson.g + ", " + rgbJson.b;
  };

  return temperatureChartService;

});
