import { Component, OnInit, OnDestroy } from '@angular/core';
import { AirQualityService } from 'src/app/services/air-quality.service';
import { AirQualityModel } from 'src/app/models/air-quality.model';
import { GetDefaultAirChartConfig } from 'src/app/constant/chart-config';
import Chart from 'chart.js';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
moment.locale('th');

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html'
})
export class AirQualityComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject();
  gaugeType = 'semi';
  nowDate: string;
  fromNowDate: string;

  lastedSensor: AirQualityModel = {
    pm10: 0,
    pm25: 0,
    time: undefined
  };

  public canvasPm10: any;
  public ctxPm10;

  public canvasPm25: any;
  public ctxPm25;

  public pm10Chart;
  public pm25Chart;

  private pm10ChartConfig = GetDefaultAirChartConfig();
  private pm25ChartConfig = GetDefaultAirChartConfig();

  updateTimeFromNow;

  constructor(private aqService: AirQualityService) { }

  ngOnInit() {
    this.canvasPm10 = document.getElementById('pm10Chart');
    this.ctxPm10 = this.canvasPm10.getContext('2d');
    this.pm10Chart = new Chart(this.ctxPm10, this.pm10ChartConfig);

    this.canvasPm25 = document.getElementById('pm25Chart');
    this.ctxPm25 = this.canvasPm25.getContext('2d');
    this.pm25Chart = new Chart(this.ctxPm25, this.pm25ChartConfig);

    this.aqService.getDataAirQuality().pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      if (x.length > 0) {
        this.lastedSensor = x.pop();
        this.lastedSensor.time = moment.unix(this.lastedSensor.time);

        this.updateTime(this.lastedSensor.time);
        this.updateChart(this.pm10Chart, 'pm10', x);
        this.updateChart(this.pm25Chart, 'pm25', x);
      }
    });
    this.updateTimeFromNow = setInterval(() => this.fromNowDate = this.lastedSensor.time.fromNow(), 60*1000);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    clearInterval(this.updateTimeFromNow);
    this.unsubscribe$.complete();
  }

  updateChart(chart: any, type: any, data: AirQualityModel[]) {
    const pm = data.map(k => k[type]);

    const p: any[] = [pm];
    for (let index = 0; index < p.length; index++) {
      chart.data.datasets[index].data = p[index];
    }
    chart.data.labels = data.map(k => moment.unix(k.time).format('H:mm'));
    chart.update();
  }

  updateTime(t: any) {
    this.nowDate = t.format('dddd, MMMM Do YYYY, H:mm');
    this.fromNowDate = t.fromNow();
  }

}
