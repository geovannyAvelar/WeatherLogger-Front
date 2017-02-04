//TODO This service need to be reusable
app.service('TemperatureChartService', function() {
  var temperatureChartService = {};
  var temperatureChart = null;

  temperatureChartService.drawChart = function(weatherData) {

    var chartData = {
                      labels: weatherData.dates,
                      datasets: [{
                          label: 'Temperatures (Cº)',
                          fill: true,
                          lineTension: 0.1,
                          backgroundColor: "rgba(255, 165, 0, 0.4)",
                          borderColor: "rgba(255, 131, 0, 1)",
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: 'miter',
                          pointBorderColor: "rgba(255, 63, 0, 1)",
                          pointBackgroundColor: "#fff",
                          pointBorderWidth: 1,
                          pointHoverRadius: 5,
                          pointHoverBackgroundColor: "rgba(255, 165, 0, 1)",
                          pointHoverBorderColor: "rgba(255, 165, 0, 1)",
                          pointHoverBorderWidth: 2,
                          pointRadius: 1,
                          pointHitRadius: 10,
                          data: weatherData.temperatures,
                          spanGaps: false,
                      }]
                    };
    var chartOptions = {
                        legend: {
                          display: true,
                          labels: {
                              fontColor: 'rgb(255, 99, 132)'
                          }
                        }
                      };

    if(temperatureChart !== null) {
      temperatureChart.destroy();
    }

    var tempChartContext = document.getElementById("tempChart").getContext("2d");
    temperatureChart = new Chart(tempChartContext,
                                {type: 'line', data: chartData, options: chartOptions });
  };

  // Transform server JSON in a formatted data to charts
  temperatureChartService.formatDataToChart = function(weatherData) {
    var formattedData = {dates: [], temperatures: []};

    for(var i in weatherData) {
      // TODO Modify the date pattern on web service JSON to return dates on UTC format (with 'Z')
      formattedData.dates.push(moment(weatherData[i].date + "Z").utc().format("HH:mm"));
      formattedData.temperatures.push(weatherData[i].temperature);
    }

    return formattedData;
  };

  return temperatureChartService;

});
