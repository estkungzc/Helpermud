import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { RawSensorData } from '../models/sensors.model';
import { ValveSettingModel } from '../models/valve-setting.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dataSensorsRef;
  private dataValveRef;
  constructor(db: AngularFireDatabase) {
    this.dataSensorsRef = db.list<RawSensorData>('Node_A/sensors', ref => ref.limitToLast(10));
    this.dataValveRef = db.object('Node_A/valve_settings')
   }

   getSensorsValue(): Observable<RawSensorData[]> {
     return this.dataSensorsRef.valueChanges();
   }


   getValveSettings(): Observable<ValveSettingModel> {
    return this.dataValveRef.valueChanges();
   }

   changeValveState(s: number, th: number) {
    return this.dataValveRef.set({ state: s, threshold: th});
  }

  updateValveManual(s) {
    return this.dataValveRef.update({ state: s});
  }

}
