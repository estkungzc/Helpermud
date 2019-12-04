import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Sensor, SensorData } from 'src/app/models/sensors.model';
import { map, last } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styles: [
    `
      ngx-gauge {
        height: 150px !important;
      }
    `
  ]
})
export class DashboardComponent implements OnInit {
  gaugeType = 'semi';
  gaugeTempLabel = 'องศาเซลเซียส';
  gaugeTempAppendText = '°C';
  gaugeHumidLabel = 'เปอร์เซ็นต์';
  gaugeHumidAppendText = '%';
  thresholdConfig = {
    '0': { color: 'green' },
    '40': { color: 'orange' },
    '75.5': { color: 'red' }
  };

  enable = true;
  isLoading = false;
  fakeAsync: Observable<boolean> = new Observable(observer => {
    this.isLoading = true;
    const timeout = setTimeout(() => {
      this.isLoading = false;
      observer.next(true);
    }, 2000);
    return () => clearTimeout(timeout);
  });

  lastedSensor: Sensor = {
    airHumidity: 0,
    airTemperature: 0,
    soilMoisture: 0,
    soilTemperature: 0
  };

  public canvas: any;
  public ctx;
  public chartEmail;
  public chartHours;
  public airTempChart;
  public airHumidChart;
  public soilTempChart;

  constructor(private db: DashboardService) {}

  ngOnInit() {
    this.canvas = document.getElementById('soilTempChart');
    this.ctx = this.canvas.getContext('2d');

    this.soilTempChart = new Chart(this.ctx, {
      type: 'line',
      data: {
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
                maxTicksLimit: 10
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: '#ccc',
                color: 'rgba(255,255,255,0.05)'
              }
            }
          ],

          xAxes: [
            {
              type: 'time',
              distribution: 'series'
            }
          ]
        }
      }
    });

    const data$ = this.db.getSensorsValue().pipe(
      map(k =>
        k.map(x => {
          return {
            dataLoc1: {
              airHumidity: Number(x.dataLoc1.airHumidity),
              airTemperature: Number(x.dataLoc1.airTemperature),
              soilMoisture: Number(x.dataLoc1.soilMoisture),
              soilTemperature: Number(x.dataLoc1.soilTemperature)
            },
            dataLoc2: {
              airHumidity: Number(x.dataLoc2.airHumidity),
              airTemperature: Number(x.dataLoc2.airTemperature),
              soilMoisture: Number(x.dataLoc2.soilMoisture),
              soilTemperature: Number(x.dataLoc2.soilTemperature)
            },
            time: x.time
          } as SensorData;
        })
      )
    );
    data$.subscribe(x => {
      console.log(x);
      if (x.length > 0) {
        const lastValue = x.pop();
        console.log(moment.unix(lastValue.time).toDate());
        const avgAirHumid =
          (lastValue.dataLoc1.airHumidity + lastValue.dataLoc2.airHumidity) / 2;
        const avgAirTemp =
          (lastValue.dataLoc1.airTemperature +
            lastValue.dataLoc2.airTemperature) /
          2;
        const avgSoilMois =
          (lastValue.dataLoc1.soilMoisture + lastValue.dataLoc2.soilMoisture) /
          2;
        const avgSoilTemp =
          (lastValue.dataLoc1.soilTemperature +
            lastValue.dataLoc2.soilTemperature) /
          2;
        this.lastedSensor = {
          airHumidity: avgAirHumid,
          airTemperature: avgAirTemp,
          soilMoisture: avgSoilMois,
          soilTemperature: avgSoilTemp
        };
        console.log(this.lastedSensor);

        console.log('SoilTempChart');
        // this.updateAirTempChart(x);
        this.updateSoilTempChart(this.soilTempChart, x);
      } else {
        console.log('????');
      }
    });
  }

  updateAirTempChart(data: SensorData[]) {
    this.airTempChart = new Chart(document.getElementById('airTempChart'), {
      type: 'line',
      data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: 'Africa',
            borderColor: '#3e95cd',
            fill: false
          },
          {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: 'Asia',
            borderColor: '#8e5ea2',
            fill: false
          },
          {
            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
            label: 'Europe',
            borderColor: '#3cba9f',
            fill: false
          },
          {
            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
            label: 'Latin America',
            borderColor: '#e8c3b9',
            fill: false
          },
          {
            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
            label: 'North America',
            borderColor: '#c45850',
            fill: false
          }
        ]
      }
    });
  }

  updateSoilTempChart(chart, data: SensorData[]) {
    const d1 = data.map(k => {
      return {
        x: moment.unix(k.time).toDate(),
        y: k.dataLoc1.soilTemperature
      };
    });
    const d2 = data.map(k => {
      return {
        x: moment.unix(k.time).toDate(),
        y: k.dataLoc2.soilTemperature
      };
    });
    const avg = data.map(k => {
      return {
        x: moment.unix(k.time).toDate(),
        y: (k.dataLoc1.soilTemperature + k.dataLoc2.soilTemperature) / 2
      };
    });
    // console.log('hello world');
    const p = [d1, avg, d2];
    for (let index = 0; index < 3; index++) {
      chart.data.datasets[index].data = p[index];
    }
    chart.update();
  }
}
