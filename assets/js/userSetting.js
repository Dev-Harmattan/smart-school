let studentInfoCharts = {
  series: [60, 10, 10, 7, 3 ],
  labels: ['Grade A', 'Grade B', 'Grade C', 'Grade D', 'Grade E'],
  chart: {
    type: 'donut'
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};

let donutChart = new ApexCharts(document.querySelector('#student-performance'), studentInfoCharts);
donutChart.render();