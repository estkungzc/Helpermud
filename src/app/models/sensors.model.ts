export interface RawSensorData {
  dataLoc1: RawSensor;
  dataLoc2: RawSensor;
  time: number;
}

export interface RawSensor {
  airHumidity: string;
  airTemperature: string;
  soilMoisture: string;
  soilTemperature: string;
}

export interface SensorData {
  dataLoc1: Sensor;
  dataLoc2: Sensor;
  time: number;
}

export interface Sensor {
  airHumidity: number;
  airTemperature: number;
  soilMoisture: number;
  soilTemperature: number;
}

export interface SensorDate extends Sensor {
  time: any;
}
