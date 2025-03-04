

export interface HistoricalWeatherData {
    T2M: Record<string, number>;
    PRECTOTCORR: Record<string, number>; 
}

export interface WeatherPrediction {
    predictedTemperature: number;
    predictedPrecipitation: number; 
}