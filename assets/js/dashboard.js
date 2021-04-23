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


//sidebar togge implementation
let sidebarOpen =  false;
let sidebar = document.getElementById('sidebar');
let navIcon = document.getElementById('sidebarIcon');

function toggleSidebar() {
  if(!sidebarOpen){
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen){
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}


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