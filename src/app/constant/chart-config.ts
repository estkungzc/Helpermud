export function GetDefaultTempChartConfig(): any {
  return {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          borderColor: '#6bd098',
          backgroundColor: '#6bd098',
          borderWidth: 2,
          fill: false,
          label: 'เซนเซอร์ในโรงเพาะเห็ด',
          data: []
        },
        {
          borderColor: '#fcc468',
          backgroundColor: '#fcc468',
          borderWidth: 2,
          fill: false,
          label: 'ค่าเฉลี่ยเซนเซอร์',
          borderDash: [10, 5],
          data: []
        },
        {
          borderColor: '#f17e5d',
          backgroundColor: '#f17e5d',
          borderWidth: 2,
          fill: false,
          label: 'เซนเซอร์นอกโรงเพาะเห็ด',
          data: []
        }
      ]
    },

    options: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#9f9f9f',
              beginAtZero: false,
              // maxTicksLimit: 10
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: '#ccc',
              color: 'rgba(255,255,255,0.05)'
            },
            scaleLabel: {
              display: true,
              labelString: 'องศาเซลเซียส (°C)'
            }
          }
        ],

        xAxes: [
          {
            distribution: 'series'
          }
        ]
      }
    }
  };
}

export function GetDefaultHumidChartConfig(): any {
  return {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          borderColor: '#6bd098',
          backgroundColor: '#6bd098',
          borderWidth: 2,
          fill: false,
          label: 'เซนเซอร์จุดตรงกลาง',
          data: []
        },
        {
          borderColor: '#fcc468',
          backgroundColor: '#fcc468',
          borderWidth: 2,
          fill: false,
          label: 'ค่าเฉลี่ยเซนเซอร์',
          borderDash: [10, 5],
          data: []
        },
        {
          borderColor: '#f17e5d',
          backgroundColor: '#f17e5d',
          borderWidth: 2,
          fill: false,
          label: 'เซนเซอร์จุดหน้าประตู',
          data: []
        }
      ]
    },

    options: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#9f9f9f',
              beginAtZero: false,
              // maxTicksLimit: 10
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: '#ccc',
              color: 'rgba(255,255,255,0.05)'
            },
            scaleLabel: {
              display: true,
              labelString: 'เปอร์เซ็นต์ (%)'
            }
          }
        ],

        xAxes: [
          {
            distribution: 'series'
          }
        ]
      }
    }
  };
}

export function GetDefaultAirChartConfig(): any {
  return {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          borderColor: '#6bd098',
          backgroundColor: '#6bd098',
          borderWidth: 2,
          fill: false,
          label: 'ดัชนีคุณภาพอากาศ',
          data: []
        }
      ]
    },

    options: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#9f9f9f',
              beginAtZero: false,
              // maxTicksLimit: 10
            },
            // gridLines: {
            //   drawBorder: false,
            //   zeroLineColor: '#ccc',
            //   color: 'rgba(255,255,255,0.05)'
            // },
            scaleLabel: {
              display: true,
              labelString: 'ug/m^3'
            }
          }
        ],

        xAxes: [
          {
            distribution: 'series'
          }
        ]
      }
    }
  };
}

export const locationSensor: string[] = [
  'เซนเซอร์นอกโรงเพาะเห็ด',
  'เซนเซอร์ในโรงเพาะเห็ด'
];

