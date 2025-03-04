"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHistoricalWeatherData = fetchHistoricalWeatherData;
exports.predictFutureWeather = predictFutureWeather;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const axios_1 = __importDefault(require("axios"));
const formulas_1 = require("./formulas");
const NASA_POWER_API_ENDPOINT = process.env.NASA_POWER_API_ENDPOINT || "";
function fetchHistoricalWeatherData(longitude, latitude) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(" Fetching Historical Weather Data ");
            // Fetch weather data from NASA POWER API
            const response = yield axios_1.default.get(NASA_POWER_API_ENDPOINT, {
                params: {
                    parameters: 'T2M,PRECTOT', // Temperature and precipitation
                    community: 'AG', // Agriculture community
                    longitude: longitude,
                    latitude: latitude,
                    start: '20030101', // Start date (YYYYMMDD)
                    end: '20221231', // End date (YYYYMMDD)
                    format: 'JSON',
                },
            });
            console.log("Historic Weather Data Fetched");
            const result = response.data.properties.parameter;
            return result;
        }
        catch (e) {
            console.log("Error occured while fetching historical weather data");
            console.log(e);
            return null;
        }
    });
}
function predictFutureWeather(historicalData, startMonth = 1, // Starting month (1 = January, 2 = February, etc.)
durationMonths = 3 // Duration of the prediction period (default: 3 months)
) {
    // Validate input structure
    if (!(historicalData === null || historicalData === void 0 ? void 0 : historicalData.T2M) || !(historicalData === null || historicalData === void 0 ? void 0 : historicalData.PRECTOTCORR)) {
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
        if (isNaN(year))
            throw new Error(`Invalid date format in T2M: ${date}`);
        return year;
    });
    const temperatures = Object.values(temperatureData);
    // Extract years and values for precipitation
    const precipitationYears = Object.keys(precipitationData).map(date => {
        const year = parseInt(date.substring(0, 4), 10); // Extract YYYY from YYYYMMDD
        if (isNaN(year))
            throw new Error(`Invalid date format in PRECTOTCORR: ${date}`);
        return year;
    });
    const precipitations = Object.values(precipitationData);
    // Perform linear regression for temperature
    const tempRegression = (0, formulas_1.safeLinearRegression)(temperatureYears, temperatures);
    const lastTemperatureYear = Math.max(...temperatureYears); // Find the latest year
    // Perform linear regression for precipitation
    const precipRegression = (0, formulas_1.safeLinearRegression)(precipitationYears, precipitations);
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
function filterDataByMonth(data, startMonth, durationMonths) {
    const filteredData = {};
    for (const date in data) {
        const month = parseInt(date.substring(4, 6), 10); // Extract MM from YYYYMMDD
        if (month >= startMonth && month < startMonth + durationMonths) {
            filteredData[date] = data[date];
        }
    }
    return filteredData;
}
