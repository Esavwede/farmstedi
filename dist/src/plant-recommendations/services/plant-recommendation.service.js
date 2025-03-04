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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantRecommendationService = void 0;
const dotenv_1 = require("dotenv");
const weather_service_1 = require("./weather.service");
const gemini_1 = require("../../../genAI/models/gemini/gemini");
const extract_json_from_string_1 = require("../../utils/strings/extract-json-from-string");
(0, dotenv_1.config)();
class PlantRecommendationService {
    constructor() {
        this.plantRecommendationModel = new gemini_1.GoogleGeminiClient();
    }
    recommendPlant(farmData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { longitude, latitude, area, plants, soilType } = farmData;
                // Fetch Historical Weather Data 
                const historicWeatherData = yield (0, weather_service_1.fetchHistoricalWeatherData)(longitude, latitude);
                // Ensure Data Valid 
                if (!historicWeatherData) {
                    return;
                }
                // Predict Future Temperature 
                const { predictedTemperature, predictedPrecipitation } = (0, weather_service_1.predictFutureWeather)(historicWeatherData);
                // Display Predicted Temperature 
                console.log(`The predicted temperature for Long:${longitude} and Lat:${latitude} is: ${predictedTemperature} *C`);
                console.log(`The predicted precipitation for Long:${longitude} and Lat:${latitude} is: ${predictedPrecipitation} *C`);
                const plantData = { latitude, longitude, averageTemperature: predictedTemperature, totalPrecipitation: predictedPrecipitation, plants, soilType, numberOfMonths: 3 };
                // Generate AI Recommendations Based on {User Provided Data} and {Temperature & Precipitation  Data}
                const plantRecommendations = yield this.generatePlantRecommendations(plantData);
                var res = (0, extract_json_from_string_1.extractJsonFromString)(plantRecommendations);
                res = JSON.parse(res);
                return res;
            }
            catch (e) {
                console.log("Service: Could Not Recommend Crop to plant");
                console.log(e);
                throw (e);
            }
        });
    }
    generatePlantRecommendations(plantData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CROP_RECOMMENDATION_PROMPT = `

            SYSTEM: You are an AI system that give's advise and recommendations on the cultivation of a plant. 

            You will be given a Json containing: 
            - the coordinates of the farm
            - the predicted average temperature of the farm for a given number of months 
            - the number of months for which the temperature was predicted 
            - the predicted total precipitation for the number of months 
            - farm soil type
            - plant(s)  intended to be cultivated 

            You will then analyze the the given data and return a summary, structured as a json response in the form 
            {
            "climate": {
                "avgTemperature": "summary of average temperature suitability",
                "totalPrecipitation": "summary of the total precipitation suitability"
            },
            "soil": {
                "type": "summary of you suggestion for the soil type",
                "phValue": "summary of the ideal pH range for the plant"
            },
            "irrigation": {
                "technique": " ideal irrigation method summary",
                "waterQuality": "ideal type of water for the plants based on its constituent",
                "irrigationSchedule": "ideal irrigation schedule for plant"
            },
            "pestAndDiseases": {
                "commonPests": "common pests that affects plant",
                "commonPestsMitigation": "mitigation summary",
                "commonDiseases": " common diseases affecting plant",
                "commonDiseasesMitigation": "mitigation summary"
            }
            }


            Formatting Instructions: 
            - You must only return a json 
            - The json you return must follow the json response structure specified


            USER: 
            {
                "averageTemperature": ${plantData.averageTemperature}, 
                "totalPrecipitation": ${plantData.totalPrecipitation}, 
                "longitude": ${plantData.longitude},
                "latitude": ${plantData.latitude},
                "soilType": ${plantData.soilType}, 
                "plants": ${plantData.plants},
                "numberOfMonths": ${plantData.numberOfMonths} 
            }
            `;
                const result = yield this.plantRecommendationModel.generateRecommendations(CROP_RECOMMENDATION_PROMPT);
                return result;
            }
            catch (e) {
                console.log("Error occured while analyzing plant data");
                console.log(e);
            }
        });
    }
}
exports.PlantRecommendationService = PlantRecommendationService;
