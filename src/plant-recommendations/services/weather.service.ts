
import { config } from "dotenv"
config() 


import axios from "axios";
import { safeLinearRegression } from "../../utils/math/linear-regression/linear-regression";
import { HistoricalWeatherData, WeatherPrediction } from "../types/weather-data.types"





export async function fetchHistoricalWeatherData( longitude: number, latitude: number): Promise<HistoricalWeatherData | null >
{
    try 
    {
        console.log(" Fetching Historical Weather Data ") 

        const NASA_POWER_API_ENDPOINT = process.env.NASA_POWER_API_ENDPOINT || ""

         // Fetch weather data from NASA POWER API
         const response = await axios.get(NASA_POWER_API_ENDPOINT, {
            params: {
                parameters: 'T2M,PRECTOT', // Temperature and precipitation
                community: 'AG', // Agriculture community
                longitude: longitude,
                latitude: latitude,
                start: '20030101', // Start date (YYYYMMDD)
                end: '20221231', // End date (YYYYMMDD)
                format: 'JSON',
            },
        })

        console.log("Historic Weather Data Fetched")
        const result: HistoricalWeatherData = response.data.properties.parameter 
        return result
    }
    catch(e: any)
    {
        console.log("Error occured while fetching historical weather data")
        console.log(e) 
        return null 
    }
}


export function predictFutureWeather(
    historicalData: HistoricalWeatherData,
    startMonth: number = 1, // Starting month (1 = January, 2 = February, etc.)
    durationMonths: number = 3 // Duration of the prediction period (default: 3 months)
): WeatherPrediction {
    // Validate input structure
    if (!historicalData?.T2M || !historicalData?.PRECTOTCORR) {
        throw new Error('Invalid historical data format: Missing T2M or PRECTOTCORR');
    }

    // Validate start month
    if (startMonth < 1 || startMonth > 12) {
        throw new Error('Invalid start month. Must be between 1 and 12.');
    }

    // Extract and filter data for the relevant months
    const temperatureData = filterDataByMonth(historicalData.T2M, startMonth, durationMonths);
    const precipitationData = filterDataByMonth(historicalData.PRECTOTCORR, startMonth, durationMonths);

    if (Object.keys(temperatureData).length === 0 || Object.keys(precipitationData).length === 0) {
        throw new Error('No historical data available for the specified months');
    }

    // Extract years and values for temperature
    const temperatureYears = Object.keys(temperatureData).map(date => {
        const year = parseInt(date.substring(0, 4), 10); // Extract YYYY from YYYYMMDD
        if (isNaN(year)) throw new Error(`Invalid date format in T2M: ${date}`);
        return year;
    });
    const temperatures = Object.values(temperatureData);

    // Extract years and values for precipitation
    const precipitationYears = Object.keys(precipitationData).map(date => {
        const year = parseInt(date.substring(0, 4), 10); // Extract YYYY from YYYYMMDD
        if (isNaN(year)) throw new Error(`Invalid date format in PRECTOTCORR: ${date}`);
        return year;
    });
    const precipitations = Object.values(precipitationData);

    // Perform linear regression for temperature
    const tempRegression = safeLinearRegression(temperatureYears, temperatures);
    const lastTemperatureYear = Math.max(...temperatureYears); // Find the latest year

    // Perform linear regression for precipitation
    const precipRegression = safeLinearRegression(precipitationYears, precipitations);
    const lastPrecipitationYear = Math.max(...precipitationYears); // Find the latest year

    // Predict for the next year's relevant months
    const predictedTemperature = tempRegression.slope * (lastTemperatureYear + 1) + tempRegression.intercept;
    const predictedPrecipitation = precipRegression.slope * (lastPrecipitationYear + 1) + precipRegression.intercept;

    return {
        predictedTemperature,
        predictedPrecipitation,
    };
}


// Helper function to filter data by month
function filterDataByMonth(data: Record<string, number>, startMonth: number, durationMonths: number): Record<string, number> {
    const filteredData: Record<string, number> = {};

    for (const date in data) {
        const month = parseInt(date.substring(4, 6), 10); // Extract MM from YYYYMMDD
        if (month >= startMonth && month < startMonth + durationMonths) {
            filteredData[date] = data[date];
        }
    }

    return filteredData;
}

