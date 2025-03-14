

import {  config } from "dotenv"
import { fetchHistoricalWeatherData, predictFutureWeather } from "./weather.service"
import { GoogleGeminiClient } from "../../../genAI/models/gemini/gemini"
import { FarmDataInput } from "../types/farm-data";
import { extractJsonFromString } from "../../utils/strings/extract-json-from-string" 


config()

export class PlantRecommendationService
{
    private plantRecommendationModel: GoogleGeminiClient

    constructor()
    {
        this.plantRecommendationModel = new GoogleGeminiClient() 
    }


    async recommendPlant( farmData: FarmDataInput )
    {
        try 
        {
            const { longitude, latitude, area, plants, soilType } = farmData

            // Fetch Historical Weather Data 
            const historicWeatherData = await  fetchHistoricalWeatherData(longitude, latitude)
            
            // Ensure Data Valid 
            if( !historicWeatherData ){ return }

            // Predict Future Temperature 
            const { predictedTemperature, predictedPrecipitation} = predictFutureWeather( historicWeatherData )

            // Display Predicted Temperature 
            console.log(`The predicted temperature for Long:${longitude} and Lat:${latitude} is: ${ predictedTemperature } *C`)
            console.log(`The predicted precipitation for Long:${longitude} and Lat:${latitude} is: ${ predictedPrecipitation} *C`)

            const plantData: FarmDataInput = { latitude, longitude, averageTemperature: predictedTemperature, totalPrecipitation: predictedPrecipitation, plants, soilType, numberOfMonths: 3}

            // Generate AI Recommendations Based on {User Provided Data} and {Temperature & Precipitation  Data}
            const plantRecommendations:any = await this.generatePlantRecommendations( plantData ) 


            var res = extractJsonFromString( plantRecommendations)
            res = JSON.parse( res )

            return res
        }   
        catch(e: any)
        {
            console.log("Service: Could Not Recommend Crop to plant") 
            console.log(e) 
            throw(e) 
        }
    }


    async generatePlantRecommendations( plantData: FarmDataInput)
    {
        try 
        {
            
            const CROP_RECOMMENDATION_PROMPT: string = `

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
                "averageTemperature": ${ plantData.averageTemperature }, 
                "totalPrecipitation": ${ plantData.totalPrecipitation}, 
                "longitude": ${ plantData.longitude},
                "latitude": ${ plantData.latitude},
                "soilType": ${ plantData.soilType}, 
                "plants": ${ plantData.plants },
                "numberOfMonths": ${ plantData.numberOfMonths } 
            }
            `
            const result = await this.plantRecommendationModel.generateRecommendations( CROP_RECOMMENDATION_PROMPT )
            return result 
        }
        catch(e: any)
        {
            console.log("Error occured while analyzing plant data")
            console.log(e) 
        }
    }    

}