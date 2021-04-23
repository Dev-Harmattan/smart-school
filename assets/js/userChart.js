
var options1 = {
  series: [90, 30, 15, 8],
  chart: {
    width: '100%',
    type: 'pie',
  },
  labels:[ 'Grade A', 'Grade B', 'Grade C', 'Grade D'],
  theme:{
    monochrome:{
      enabled: true
    }
  },
  plotOptions:{
    pie:{
      dataLabels:{
        offset: -5,
      }
    }
  },
  
  dataLabels:{
    formatter(val, opts){
      const name = opts.w.globals.labels[opts.seriesIndex]
      return [name, val.toFixed(1) + '%']
    }
  },
  lagend:{
    show: false
  }
}

let pieChart = new ApexCharts(document.querySelector('#apex2'), options1);
pieChart.render();