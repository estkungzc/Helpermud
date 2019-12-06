import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { RawSensorData } from '../models/sensors.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dataSensorsRef;
  constructor(db: AngularFireDatabase) {
    this.dataSensorsRef = db.list<RawSensorData>('Node_A/sensors', ref => ref.limitToLast(10));
   }

   getSensorsValue(): Observable<RawSensorData[]> {
     return this.dataSensorsRef.valueChanges();
   }

   changeValveState(state: boolean) {
    return;
  }

}
