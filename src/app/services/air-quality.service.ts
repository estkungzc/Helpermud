import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AirQualityModel } from '../models/air-quality.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {
  private dataRef;
  constructor(db: AngularFireDatabase) {
    this.dataRef = db.list<AirQualityModel>('Node_A/air_quality', ref => ref.limitToLast(10));
   }

   getDataAirQuality(): Observable<AirQualityModel[]> {
     return this.dataRef.valueChanges();
   }

}
