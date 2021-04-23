let options = {
  series: [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    },
    {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    },
    {
      name: 'Free Cash Flow',
      data: [31, 45, 36, 26, 45, 48, 52, 53, 41]
    }
  ],
  chart: {
    type: 'bar',
    height: 350,
    // sparkline: {
    //   enabled: true
    // },
  },
  plotOptions:{
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels:{
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },

  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val){
        return `$ ${val} thousands`;
      },
    },
  },
}

let chart = new ApexCharts(document.querySelector('#apex1'), options);
chart.render();