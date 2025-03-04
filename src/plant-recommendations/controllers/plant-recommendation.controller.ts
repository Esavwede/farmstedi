
import { NextFunction, Request, Response} from "express"

import { PlantRecommendationService } from "../services/plant-recommendation.service"
import { FarmDataInput } from "../schemas/plant-recommendation.schema"


export default class PlantRecommendationController
{

    private plantRecommendationService: PlantRecommendationService

    constructor()
    {
        this.plantRecommendationService = new PlantRecommendationService()
    }


    async recommendCrops
    (
        req: Request<{},{}, FarmDataInput['body']>, 
        res: Response, 
        next: NextFunction 
    )
    {
        try 
        {
            res.setTimeout(100000)
            const farmData = req.body
            const plantRecommendations = await this.plantRecommendationService.recommendPlant( farmData ) 
            
            res.send( plantRecommendations )
            return 
        }
        catch(e: any)
        {
            next(e) 
        }
    } 

}