import { Component, OnInit, OnDestroy } from "@angular/core";
import Chart from "chart.js";
import { Observable, Subject } from "rxjs";
import { DashboardService } from "src/app/services/dashboard.service";
import { Sensor, SensorData, SensorDate } from "src/app/models/sensors.model";
import { map, last, takeUntil } from "rxjs/operators";
import * as moment from "moment";
import {
  GetDefaultHumidChartConfig,
  GetDefaultTempChartConfig,
  locationSensor
} from "src/app/constant/chart-config";
import { GetThresholdGuageConfig } from "src/app/constant/guage-config";
import { ValveSettingsComponent } from "src/app/components/valve-settings/valve-settings.component";
import { BsModalService } from "ngx-bootstrap";

moment.locale("th");

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
  styles: [
    `
      ngx-gauge {
        height: 150px !important;
      }
    `
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject();
  gaugeType = "semi";
  guageLabel = "เซนเซอร์ในโรงเพาะเห็ด"
  gaugeTempLabel = "องศาเซลเซียส";
  gaugeTempAppendText = "°C";
  gaugeHumidLabel = "เปอร์เซ็นต์";
  gaugeHumidAppendText = "%";
  thresholdConfig = GetThresholdGuageConfig();

  valveSelected = {
    state: undefined,
    text: undefined
  };

  valveEnable;

  lastedSensor = {
    airHumidity: 0,
    airTemperature: 0,
    soilMoisture: 0,
    soilTemperature: 0,
    time: undefined
  };

  public canvasAirTemp: any;
  public ctxAirTemp;

  public canvasAirHumid: any;
  public ctxAirHumid;

  public canvasSoilTemp: any;
  public ctxSoilTemp;

  public canvasSoilMois: any;
  public ctxSoilMois;

  public airTempChart;
  public airHumidChart;
  public soilTempChart;
  public soilMoisChart;

  private airTempChartConfig = GetDefaultTempChartConfig();
  private airHumidChartConfig = GetDefaultHumidChartConfig();
  private soilTempChartConfig = GetDefaultTempChartConfig();
  private soilMoisChartConfig = GetDefaultHumidChartConfig();

  private attrSensors = {
    airTemp: "airTemperature",
    airHumid: "airHumidity",
    soilTemp: "soilTemperature",
    soilMois: "soilMoisture"
  };

  nowDate: string;
  fromNowDate: string;

  updateTimeFromNow;
  loc = locationSensor;

  constructor(
    private dbService: DashboardService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    // console.log(this.loc);
    this.canvasAirTemp = document.getElementById("airTempChart");
    this.ctxAirTemp = this.canvasAirTemp.getContext("2d");
    this.airTempChart = new Chart(this.ctxAirTemp, this.airTempChartConfig);

    this.canvasAirHumid = document.getElementById("airHumidChart");
    this.ctxAirHumid = this.canvasAirHumid.getContext("2d");
    this.airHumidChart = new Chart(this.ctxAirHumid, this.airHumidChartConfig);

    this.canvasSoilTemp = document.getElementById("soilTempChart");
    this.ctxSoilTemp = this.canvasSoilTemp.getContext("2d");
    this.soilTempChart = new Chart(this.ctxSoilTemp, this.soilTempChartConfig);

    this.canvasSoilMois = document.getElementById("soilMoisChart");
    this.ctxSoilMois = this.canvasSoilMois.getContext("2d");
    this.soilMoisChart = new Chart(this.ctxSoilMois, this.soilMoisChartConfig);

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

        // const avgAirHumid =
        //   (lastValue.dataLoc1.airHumidity + lastValue.dataLoc2.airHumidity) / 2;
        // const avgAirTemp =
        //   (lastValue.dataLoc1.airTemperature +
        //     lastValue.dataLoc2.airTemperature) /
        //   2;
        // const avgSoilMois =
        //   (lastValue.dataLoc1.soilMoisture + lastValue.dataLoc2.soilMoisture) /
        //   2;
        // const avgSoilTemp =
        //   (lastValue.dataLoc1.soilTemperature +
        //     lastValue.dataLoc2.soilTemperature) /
        //   2;
        this.lastedSensor = {
          airHumidity: lastValue.dataLoc1.airHumidity,
          airTemperature: lastValue.dataLoc1.airTemperature,
          soilMoisture: lastValue.dataLoc1.soilMoisture,
          soilTemperature: lastValue.dataLoc1.soilTemperature,
          time: moment.unix(lastValue.time)
        };

        // loc1: in, loc2 out
        // this.lastedLoc = [lastValue.dataLoc2, lastValue.dataLoc1];
        // this.airTempValues = this.lastedLoc.map(e => e.airTemperature);
        // this.airHumidValues = this.lastedLoc.map(e => e.airHumidity);
        // this.soilTempValues = this.lastedLoc.map(e => e.soilTemperature);
        // this.soilMoisValues = this.lastedLoc.map(e => e.soilMoisture);

        this.updateTime(this.lastedSensor.time);
        this.updateChart(this.airTempChart, this.attrSensors.airTemp, x);
        this.updateChart(this.airHumidChart, this.attrSensors.airHumid, x);
        this.updateChart(this.soilTempChart, this.attrSensors.soilTemp, x);
        this.updateChart(this.soilMoisChart, this.attrSensors.soilMois, x);
      }
    });

    this.updateTimeFromNow = setInterval(
      () => (this.fromNowDate = this.lastedSensor.time.fromNow()),
      60 * 1000
    );

    this.dbService.getValveSettings().subscribe(v => {
      this.valveSelected = {
        state: v.state,
        text: v.state === 2 ? "รดน้ำอัติโนมัติ" : "รดน้ำควบคุมด้วยตนเอง"
      };
      if (v.state !== 2) {
        this.valveEnable = !!v.state;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    clearInterval(this.updateTimeFromNow);
    this.unsubscribe$.complete();
  }

  updateChart(chart: any, type: any, data: SensorData[]) {
    const d1 = data.map(k => k.dataLoc1[type]);
    const d2 = data.map(k => k.dataLoc2[type]);
    const avg = data.map(k => (k.dataLoc1[type] + k.dataLoc2[type]) / 2);

    const p: any[] = [d1, avg, d2];
    for (let index = 0; index < p.length; index++) {
      chart.data.datasets[index].data = p[index];
    }
    chart.data.labels = data.map(k => moment.unix(k.time).format("H:mm"));
    chart.update();
  }

  updateTime(t: any) {
    this.nowDate = t.format("dddd, MMMM Do YYYY, H:mm");
    this.fromNowDate = t.fromNow();
  }

  valveSettings() {
    const modalRef = this.modalService.show(ValveSettingsComponent);
  }

  onChangeValveState(b) {
    this.dbService.updateValveManual(b ? 1 : 0);
  }
}
