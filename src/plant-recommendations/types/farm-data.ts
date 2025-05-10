export interface FarmDataInput {
  longitude: number;
  latitude: number;
  soilType: string;
  plants: string[];
  area?: number;
  plantingDate?: string;
  numberOfMonths?: number;
  averageTemperature?: number;
  totalPrecipitation?: number;
}
