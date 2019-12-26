import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { RawSensorData } from '../models/sensors.model';
import { ValveSettingModel } from '../models/valve-setting.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dataSensorsRef;
  private dataValveRef;
  private nowDate;
  constructor(db: AngularFireDatabase) {
    this.nowDate = moment().format('D-M-YYYY');
    this.dataSensorsRef = db.list<RawSensorData>(`Node_A/sensors`, ref => ref.child(this.nowDate).orderByChild('time').limitToLast(12));
    this.dataValveRef = db.object('Node_A/valve_settings');
  }

  getSensorsValue(): Observable<RawSensorData[]> {
    return this.dataSensorsRef.valueChanges();
  }

  getValveSettings(): Observable<ValveSettingModel> {
    return this.dataValveRef.valueChanges();
  }

  changeValveState(settings: ValveSettingModel) {
    return this.dataValveRef.set({
      state: settings.state,
      threshold: settings.threshold,
      wateringPeriod: settings.wateringPeriod
    });
  }

  updateValveManual(s) {
    return this.dataValveRef.update({ state: s });
  }
}
