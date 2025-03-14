
import { Express } from "express"
import { Router } from "express"


import PlantRecommendationController from "../controllers/plant-recommendation.controller"


import { farmDataSchema } from "../schemas/plant-recommendation.schema"
import validateRequestSchema from "../../middleware/validation/reqSchema/validate"

const router = Router() 

export default function plantRecommendationRoutes( app: Express )
{
    try 
    {
        const plantRecommendationController = new PlantRecommendationController() 

        router.post
        (
            "/recommend",
            validateRequestSchema( farmDataSchema),
            plantRecommendationController.recommendCrops.bind( plantRecommendationController )
        )

        app.use('/api/v1/plant', router )
    }
    catch(e: any)
    {
        console.log("Error Occured While Creating Plant Recommendation Routes") 
        console.log(e) 
    }
}