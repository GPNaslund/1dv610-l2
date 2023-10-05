import ApexCharts from 'apexcharts';

class ChartGenerator {
  generateApexChart(chartElement, scores, categories) {
    var options = {
      series: [{
          name: 'Correct',
          data: scores
      }],
      chart: {
          type: 'bar',
          height: 500,
          toolbar: {
              show: false
          }
      },
      plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
          },
      },
      xaxis: {
          categories: categories
      },
      yaxis: {
        title: {
            text: 'Correct Answers (%)'
        },
        max: 100
    },
      tooltip: {
          y: {
              formatter: function (val) {
                  return val + " %"
              }
          }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val + "%";
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ['#304758']
        }
    }
  };
  return new ApexCharts(chartElement, options);
  }
}

export default ChartGenerator;