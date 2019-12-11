import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { locationSensor } from 'src/app/constant/chart-config';
import { Sensor, SensorData } from 'src/app/models/sensors.model';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from "moment";
moment.locale("th");

@Component({
  selector: 'app-different-loc',
  templateUrl: './different-loc.component.html'
})
export class DifferentLocComponent implements OnInit {
  private unsubscribe$: Subject<boolean> = new Subject();
  airTempValues: number[] = [];
  airHumidValues: number[] = [];
  soilTempValues: number[] = [];
  soilMoisValues: number[] = [];
  lastedLoc: Sensor[] = [];
  loc = locationSensor;

  nowDate: string;

  constructor(private dbService: DashboardService) {}

  ngOnInit() {
    const data$ = this.dbService.getSensorsValue().pipe(
      takeUntil(this.unsubscribe$),
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
      if (x.length > 0) {
        const lastValue = x[x.length - 1];
        // loc1: in, loc2 out
        this.lastedLoc = [lastValue.dataLoc2, lastValue.dataLoc1];
        this.airTempValues = this.lastedLoc.map(e => e.airTemperature);
        this.airHumidValues = this.lastedLoc.map(e => e.airHumidity);
        this.soilTempValues = this.lastedLoc.map(e => e.soilTemperature);
        this.soilMoisValues = this.lastedLoc.map(e => e.soilMoisture);

        this.nowDate = moment.unix(lastValue.time).format('dddd, MMMM Do YYYY, H:mm');
      }
    });
  }

  customizeTempLabel(arg) {
    return arg.valueText + ' °C';
  }

  customizeHumidLabel(arg) {
    return arg.valueText + ' %';
  }

  customizeLegend = arg => {
    return this.loc[arg.item.index];
  }
}
