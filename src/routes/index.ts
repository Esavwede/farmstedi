

import { Express} from "express"
import userRoutes from "../user/user.route";
import plantRecommendationRoutes from "../plant-recommendations/routes/plant-recommendation.routes";


export default function routes(app: Express)
{
    userRoutes(app)
    plantRecommendationRoutes(app)
}